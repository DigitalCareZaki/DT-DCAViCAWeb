'use client';

import { useState, useCallback, useMemo, useTransition } from 'react';

import '@init-globals';

import RenderPatients from './RenderPatients';
import { getDoctorSinglePatientFromVl, getECGReportByDate, syncVivalink } from '@service';
import { InputPrimary, ButtonPrimary } from '@common';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSync, FaCheckCircle, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';
import ECGPlot from './EcgPlot';
import { showModalReducer } from '@slice';

const Patients: ClientComponentProps<Props> = ({ data, avicaPatients = [], pagination }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'monitoring' | 'management'>('monitoring');
  const [selectedPatient, setSelectedPatient] = useState<any>({
    name: undefined,
    ecg: [],
    timePerPoint: "",
    samplingFrequency: "",
    otherAttributes: {},
  });
  const [selectedDuration, setSelectedDuration] = useState("1 minute");
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [isDatePending, startDateTransition] = useTransition();

  // Memoize flattened ECG data to avoid heavy recomputation on each render
  const flattenedEcgData = useMemo(() => {
    if (!selectedPatient?.ecg || selectedPatient.ecg.length === 0) return [];
    return selectedPatient.ecg.reduce((acc: any, curr: any) => [...acc, ...curr], []);
  }, [selectedPatient?.ecg]);

  const durations = {
    duration: ["1 minute", "2 minute", "3 minute"],
  };

  const getDuration = async (e: any) => {
    const duration = e.target.value;
    setSelectedDuration(duration);

    if (!selectedPatient.name) return;

    const patchSn = data[selectedPatient.name]?.[0]?.replace('/', '%2F');

    if (!patchSn) return;

    try {
      const res = await getDoctorSinglePatientFromVl(patchSn, duration);
      setSelectedPatient({
        name: selectedPatient.name,
        ecg: res.data.ecg,
        samplingFrequency: res.data.samplingFrequency,
        timePerPoint: res.data.timePerPoint,
        otherAttributes: res.data?.otherAttributes
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    startDateTransition(() => setSelectedDate(value));
  }, []);

  const generateECGReport = async () => {
    if (reportLoading) return;
    if (!selectedPatient.name || !selectedDate) {
      alert("Please select a patient and date first!");
      return;
    }

    setReportLoading(true);

    let reportWindow: Window | null = null;
    try {
      const ecgRecordId = data[selectedPatient.name]?.[0]?.replace('/', '_');
      if (!ecgRecordId) throw new Error("ECG Record ID not found!");

      reportWindow = typeof window !== 'undefined' ? window.open('', '_blank') : null;
      if (reportWindow) {
        reportWindow.document.write('<html><head><title>Generating Report...</title></head><body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">Generating ECG Report... Please wait.</body></html>');
      }

      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const [res] = await Promise.all([
        getECGReportByDate(ecgRecordId, selectedDate),
        delay,
      ]);

      if (res.success && res.data?.pdfUrl) {
        if (reportWindow) reportWindow.location.href = res.data.pdfUrl;
      } else {
        if (reportWindow) reportWindow.close();
        alert("ECG Report not available for the selected date.");
      }
    } catch (error) {
      console.error("Error generating ECG report:", error);
      if (reportWindow && !reportWindow.closed) reportWindow.close();
      alert("ECG Report not available for the selected date.");
    } finally {
      setReportLoading(false);
    }
  };

  const handleSetSelectedPatient = useCallback(
    async (name: string) => {
      if (name === selectedPatient.name) return;

      setSelectedPatient({
        name: undefined,
        ecg: [],
        timePerPoint: "",
        samplingFrequency: "",
        otherAttributes: {}
      });

      setSyncingId('FETCHING_PATIENT');
      setShowDatePicker(true);

      const patchSn = data[name][0]?.replace('/', '%2F');

      if (!patchSn) return;
      const res = await getDoctorSinglePatientFromVl(patchSn, '1 minute');

      if (!res.success) {
        setSyncingId(null);
        return;
      }

      setSyncingId(null);
      setSelectedPatient({
        name,
        ecg: res.data.ecg,
        samplingFrequency: res.data.samplingFrequency,
        timePerPoint: res.data.timePerPoint,
        otherAttributes: res.data.otherAttributes
      });
    },
    [data, selectedPatient.name]
  );

  const handleSyncPatient = async (item: any) => {
    try {
      setSyncingId(item.id);
      const res = await syncVivalink(item.id);

      if (res.success) {
        dispatch(showModalReducer({
          message: 'Patient synced with Vivalink successfully!',
          type: 'SUCCESS',
          show: true,
        }));
        setTimeout(() => window.location.reload(), 2000);
      } else {
        dispatch(showModalReducer({
          message: res.message || 'Sync failed. Please try again.',
          type: 'ERROR',
          show: true,
        }));
      }
    } catch (error: any) {
      console.error('Error syncing patient:', error);
      dispatch(showModalReducer({
        message: error?.message || 'Sync failed. Please try again.',
        type: 'ERROR',
        show: true,
      }));
    } finally {
      setSyncingId(null);
    }
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-6 py-3 text-lg font-medium transition-all duration-200 ${activeTab === 'monitoring'
            ? 'border-b-4 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Real-time Monitoring
        </button>
        <button
          onClick={() => setActiveTab('management')}
          className={`px-6 py-3 text-lg font-medium transition-all duration-200 ${activeTab === 'management'
            ? 'border-b-4 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Sync Management
        </button>
      </div>

      {activeTab === 'monitoring' ? (
        <>
          <div className="flex w-full flex-wrap items-center justify-center gap-6">
            {Object.keys(data).length > 0 ? (
              <RenderPatients
                patients={data}
                selectedPatient={selectedPatient}
                handleSetSelectedPatient={handleSetSelectedPatient}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 w-full">
                <FaExclamationTriangle size={48} className="text-yellow-500 mb-4" />
                <p className="text-xl font-semibold text-gray-700">No Patients in Vivalink</p>
                <p className="text-gray-500 mb-6">You haven&apos;t synced any patients with AViCardia monitoring yet.</p>
                <button
                  onClick={() => setActiveTab('management')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Sync Management
                </button>
              </div>
            )}
          </div>
          {syncingId && (
            <div className="flex items-center justify-center p-4">
              <div className="loader mr-2"></div>
              Processing...
            </div>
          )}
          <div className="flex items-center justify-center">
            <div style={{ width: '90vw' }}>
              <div style={{ minWidth: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
                {selectedPatient.name && (
                  <>
                    <p><strong>Sampling Frequency:</strong> {selectedPatient?.samplingFrequency}</p>
                    <p><strong>Time Per Point:</strong> {selectedPatient?.timePerPoint}</p>
                    <p><strong>Respiratory Rate:</strong> {selectedPatient?.otherAttributes?.vitals?.rr}</p>
                    <p><strong>Heart Rate:</strong> {selectedPatient?.otherAttributes?.vitals?.hr}</p>
                    <p><strong>Record Time:</strong> {new Date(selectedPatient?.otherAttributes?.recordTime).toLocaleString()}</p>
                    {showDatePicker && (
                      <div className="mt-4 flex items-center gap-3 text-base">
                        <label className="font-semibold text-gray-700">
                          Select Date To Get ECG Report:
                        </label>
                        <div className="w-[300px]" aria-busy={isDatePending}>
                          <InputPrimary
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            max={new Date().toISOString().split('T')[0]}
                            inputClassName='text-base font-semibold'
                          />
                          {isDatePending && (
                            <span className="ml-2 inline-block h-4 w-4 align-middle border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>
                        <div className="w-[220px]">
                          <ButtonPrimary
                            onClick={generateECGReport}
                            disabled={!selectedDate}
                            loading={reportLoading}
                            name={reportLoading ? 'Generating...' : 'Generate Report'}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {selectedPatient?.ecg && selectedPatient?.ecg?.length > 0 && (
                <>
                  <div className="mt-5 mb-5 flex items-center gap-3">
                    <label htmlFor="duration" className="font-semibold text-gray-700">
                      Select Duration:
                    </label>
                    <select
                      id="duration"
                      className="border w-[220px] border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={selectedDuration}
                      onChange={getDuration}
                    >
                      <option value="" disabled>
                        Select a duration
                      </option>
                      {durations?.duration?.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ overflowX: 'auto', width: '100%' }}>
                    <ECGPlot data={flattenedEcgData}></ECGPlot>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Monitoring Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Vivalink Error</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {avicaPatients.map((item: any, idx: number) => {
                const patient = item.user;
                const isSynced = item.vivalink_synced;
                const syncError = item.vivalink_sync_error;

                return (
                  <tr key={idx} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{`${patient?.first_name || ''} ${patient?.last_name || ''}`}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{patient?.email}</td>
                    <td className="px-6 py-4">
                      {isSynced ? (
                        <div className="flex items-center text-green-600 gap-1 font-medium">
                          <FaCheckCircle />
                          <span>Synced</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400 gap-1 font-medium">
                          <FaSync className="animate-pulse" />
                          <span>Not Synced</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {syncError ? (
                        <div className="flex items-center text-[11px] text-red-500 font-medium leading-tight bg-red-50 p-2 rounded border border-red-100 max-w-[200px]">
                          <FaExclamationTriangle className="mr-1.5 flex-shrink-0" />
                          <span>{syncError}</span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs italic">No errors</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {!isSynced ? (
                        <button
                          disabled={!!syncingId}
                          onClick={() => handleSyncPatient(item)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-2 mx-auto ${syncingId === item.id
                            ? 'bg-blue-600 text-white shadow-inner'
                            : syncingId
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                          <FaSync size={12} className={syncingId === item.id ? 'animate-spin' : ''} />
                          {syncingId === item.id ? 'Syncing...' : 'Sync to Vivalink'}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-100 text-gray-400 px-4 py-1.5 rounded-lg text-sm font-medium cursor-not-allowed mx-auto"
                        >
                          Already Synced
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => pagination.prevPage && goToPage(pagination.prevPage)}
                  disabled={!pagination.hasPrevPage}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={() => pagination.nextPage && goToPage(pagination.nextPage)}
                  disabled={!pagination.hasNextPage}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{pagination.currentPage}</span> of{' '}
                    <span className="font-medium">{pagination.totalPages}</span> | Total{' '}
                    <span className="font-medium">{pagination.totalItems}</span> patients
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => pagination.prevPage && goToPage(pagination.prevPage)}
                      disabled={!pagination.hasPrevPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Logic to show limited page numbers if totalPages is large
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.totalPages ||
                        (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${pagination.currentPage === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === pagination.currentPage - 2 ||
                        pageNum === pagination.currentPage + 2
                      ) {
                        return (
                          <span
                            key={pageNum}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => pagination.nextPage && goToPage(pagination.nextPage)}
                      disabled={!pagination.hasNextPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
          {avicaPatients.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No patients found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Patients;
