'use client';

import { useState, useCallback, useMemo } from 'react';

import '@init-globals';

import RenderPatients from './RenderPatients';
import Graph from './Graph';

import { getDoctorSinglePatientFromVl, getECGReportByDate } from '@service';
import { InputPrimary, ButtonPrimary } from '@common';

import type { ClientComponentProps } from '@types';
import type { Props, SelectedPatient } from './types';
import ECGPlot from './EcgPlot';

const Patients: ClientComponentProps<Props> = ({ data }) => {
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

  // Memoize flattened ECG data to avoid heavy recomputation on each render
  const flattenedEcgData = useMemo(() => {
    if (!selectedPatient?.ecg || selectedPatient.ecg.length === 0) return [];
    return selectedPatient.ecg.reduce((acc: any, curr: any) => [...acc, ...curr], []);
  }, [selectedPatient?.ecg]);
  const durations = {
    duration: ["1 minute", "2 minute", "3 minute"],

  };


  // const getDuration = async (e: any) => {
  //   debugger;
  //   const duration = e.target.value;
  //   setSelectedDuration(duration);
  //   const patchSn = data[name]?.[0]?.replace('/', '%2F');
  //     if (!patchSn) return;
  //     const res = await getDoctorSinglePatientFromVl(patchSn, duration);
  // };
  const getDuration = async (e: any) => {
    const duration = e.target.value;
    setSelectedDuration(duration);

    // Make sure a patient is selected
    if (!selectedPatient.name) {
      console.error("No patient selected!");
      return;
    }

    // Retrieve patchSn correctly
    const patchSn = data[selectedPatient.name]?.[0]?.replace('/', '%2F');

    if (!patchSn) {
      console.error("Patch SN not found!");
      return;
    }

    // Call API with the correct patchSn and duration
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

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
      if (!ecgRecordId) {
        throw new Error("ECG Record ID not found!");
      }

      const formattedDate = selectedDate;

      // Open a placeholder tab immediately to avoid popup blocking
      reportWindow = typeof window !== 'undefined' ? window.open('', '_blank') : null;
      if (reportWindow) {
        reportWindow.document.write('<html><head><title>Generating Report...</title></head><body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">Generating ECG Report... Please wait.</body></html>');
      }

      // Ensure loader shows for at least 5 seconds before opening report
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const [res] = await Promise.all([
        getECGReportByDate(ecgRecordId, formattedDate),
        delay,
      ]);

      if (res.success && res.data?.pdfUrl) {
        if (reportWindow) {
          reportWindow.location.href = res.data.pdfUrl;
        } else {
          window.open(res.data.pdfUrl, '_blank');
        }
      } else {
        if (reportWindow) reportWindow.close();
        alert("ECG Report not available for the selected date. Please try a different date.");
      }
    } catch (error) {
      console.error("Error generating ECG report:", error);
      if (reportWindow && !reportWindow.closed) {
        reportWindow.close();
      }
      alert("ECG Report not available for the selected date. Please try a different date.");
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
      })

      setLoading(true);
      setShowDatePicker(true);

      const patchSn = data[name][0]?.replace('/', '%2F');


      if (!patchSn) return;
      const res = await getDoctorSinglePatientFromVl(patchSn, '1 minute');

      if (!res.success) return;

      setLoading(false);
      setSelectedPatient({
        name,
        ecg: res.data.ecg,
        samplingFrequency: res.data.samplingFrequency,
        timePerPoint: res.data.timePerPoint,
        otherAttributes: res.data.otherAttributes
      });
    },
    [data]
  );


  return (
    // <>
    //   <div className="flex w-full flex-wrap items-center justify-center gap-6">
    //     <RenderPatients
    //       patients={data}
    //       selectedPatient={selectedPatient}
    //       handleSetSelectedPatient={handleSetSelectedPatient}
    //     />
    //   </div>
    //   {
    //     loading && (
    //       <div className="flex items-center justify-center">
    //         <div className="loader"></div>
    //         Loading, Please Wait...
    //       </div>
    //     )
    //   }
    //   <div className="flex items-center justify-center">
    //     <div style={{
    //       width: '90vw',
    //     }}>
    //       {selectedPatient.ecg && selectedPatient.ecg.length && (
    //         <div style={
    //           {
    //             overflowX: 'auto',
    //             width: '100%',
    //           }
    //         }>
    //           <ECGPlot
    //             data={
    //               // combine all the ecg data into a single array
    //               selectedPatient.ecg.reduce(
    //                 (acc, curr) => [...acc, ...curr],
    //                 []
    //               )
    //             }
    //           ></ECGPlot>
    //         </div>

    //       )}
    //     </div>
    //   </div>
    // </>
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        <RenderPatients
          patients={data}
          selectedPatient={selectedPatient}
          handleSetSelectedPatient={handleSetSelectedPatient}
        />
      </div>
      {
        loading && (
          <div className="flex items-center justify-center">
            <div className="loader"></div>
            Loading, Please Wait...
          </div>
        )
      }
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
                    <div className="w-[300px]">
                      <InputPrimary
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split('T')[0]}
                        inputClassName='text-base font-semibold'
                      />
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
          {selectedPatient.ecg && selectedPatient.ecg.length > 0 && (
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
                  {durations.duration.map((time, index) => (
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
  );
};

export default Patients;
