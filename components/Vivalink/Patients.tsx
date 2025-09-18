'use client';

import { useState, useCallback } from 'react';

import '@init-globals';

import RenderPatients from './RenderPatients';
import Graph from './Graph';

import { getDoctorSinglePatientFromVl, getECGReportByDate } from '@service';

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
    if (!selectedPatient.name || !selectedDate) {
      alert("Please select a patient and date first!");
      return;
    }

    setReportLoading(true);

    try {

      const ecgRecordId = data[selectedPatient.name]?.[0]?.replace('/', '_');

      if (!ecgRecordId) {
        throw new Error("ECG Record ID not found!");
      }

      const formattedDate = selectedDate;

      const res = await getECGReportByDate(ecgRecordId, formattedDate);

      if (res.success && res.data?.pdfUrl) {
        window.open(res.data.pdfUrl, '_blank');
      } else {
        alert("ECG Report not available for the selected date. Please try a different date.");
      }
    } catch (error) {
      console.error("Error generating ECG report:", error);
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
                  <div className="mt-4 flex items-center gap-3">
                    <label className="font-semibold text-gray-700">
                      Select Date To Get ECG Report:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="border w-[220px] border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      max={new Date().toISOString().split('T')[0]}
                    />
                    <button
                      onClick={generateECGReport}
                      disabled={!selectedDate || reportLoading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                    >
                      {reportLoading ? 'Generating...' : 'Generate Report'}
                    </button>
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

                <ECGPlot data={
                  // combine all the ecg data into a single array
                  selectedPatient.ecg.reduce(
                    (acc: any, curr: any) => [...acc, ...curr],
                    []
                  )
                }></ECGPlot>



              </div>
            </>


          )}
        </div>

      </div>
    </>
  );
};

export default Patients;
