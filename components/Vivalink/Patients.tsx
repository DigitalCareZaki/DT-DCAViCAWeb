'use client';

import { useState, useCallback, useMemo, useTransition } from 'react';

import '@init-globals';

import RenderPatients from './RenderPatients';
import { getDoctorSinglePatientFromVl, getECGReportByDate, syncVivalink } from '@service';
import { InputPrimary, ButtonPrimary } from '@common';
import { FaSync, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';
import ECGPlot from './EcgPlot';
import { showModalReducer } from '@slice';
import { useDispatch } from 'react-redux';

const Patients: ClientComponentProps<Props> = ({ data, avicaPatients = [] }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'monitoring' | 'management'>('monitoring');
  const [selectedPatient, setSelectedPatient] = useState<any>({
    name: undefined,
    ecg: [],
    timePerPoint: "",
    samplingFrequency: "",
    otherAttributes: {},
  });
  const [selectedDuration, setSelectedDuration] = useState("1 minute");
  const [loading, setLoading] = useState(false);
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

      setLoading(true);
      setShowDatePicker(true);

      const patchSn = data[name][0]?.replace('/', '%2F');

      if (!patchSn) return;
      const res = await getDoctorSinglePatientFromVl(patchSn, '1 minute');

      if (!res.success) {
        setLoading(false);
        return;
      }

      setLoading(false);
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

  const handleSyncPatient = async (patient: any) => {
    try {
      setLoading(true);
      const res = await syncVivalink({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone_number: patient.phone_number,
        gender: patient.gender,
        cardiac_monitoring: 'YES'
      });

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
    } catch (error) {
      console.error('Error syncing patient:', error);
    } finally {
      setLoading(false);
    }
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
                <p className="text-gray-500 mb-6">You haven't synced any patients with AViCardia monitoring yet.</p>
                <button
                  onClick={() => setActiveTab('management')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Sync Management
                </button>
              </div>
            )}
          </div>
          {loading && (
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
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {avicaPatients.map((item: any, idx: number) => {
                const patient = item.patient;
                const isSynced = Object.keys(data).some(name =>
                  name.toLowerCase().includes(patient.first_name.toLowerCase()) &&
                  name.toLowerCase().includes(patient.last_name.toLowerCase())
                );

                return (
                  <tr key={idx} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{`${patient.first_name || ''} ${patient.last_name || ''}`}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{patient.email}</td>
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
                    <td className="px-6 py-4 text-center">
                      {!isSynced ? (
                        <button
                          disabled={loading}
                          onClick={() => handleSyncPatient(patient)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-2 mx-auto disabled:opacity-50"
                        >
                          <FaSync size={12} />
                          {loading ? 'Syncing...' : 'Sync to Vivalink'}
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
