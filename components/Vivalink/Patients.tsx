'use client';

import { useState, useCallback } from 'react';

import '@init-globals';

import RenderPatients from './RenderPatients';
import Graph from './Graph';

import { getDoctorSinglePatientFromVl } from '@service';

import type { ClientComponentProps } from '@types';
import type { Props, SelectedPatient } from './types';
import ECGPlot from './EcgPlot';

const Patients: ClientComponentProps<Props> = ({ data }) => {
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatient>({
    name: undefined,
    ecg: [],
    timePerPoint: 0,
    samplingFrequency: 0,
  });

  const [loading, setLoading] = useState(false);
  const handleSetSelectedPatient = useCallback(
    async (name: string) => {
      if (name === selectedPatient.name) return;

      setSelectedPatient({
        name: undefined,
        ecg: [],
        timePerPoint: 0,
        samplingFrequency: 0,
      })

      setLoading(true);

      const patchSn = data[name][0]?.replace('/', '%2F');

      if (!patchSn) return;

      const res = await getDoctorSinglePatientFromVl(patchSn);

      if (!res.success) return;

      console.log(res);

      setLoading(false);
      setSelectedPatient({
        name,
        ecg: res.data.ecg,
        samplingFrequency: res.data.samplingFrequency,
        timePerPoint: res.data.timePerPoint,
      });
    },
    [data]
  );

  return (
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
        <div style={{
          width: '90vw',
        }}>
          {selectedPatient.ecg && selectedPatient.ecg.length && (
            <div style={
              {
                overflowX: 'auto',
                width: '100%',
              }
            }>
              <ECGPlot
                data={
                  // combine all the ecg data into a single array
                  selectedPatient.ecg.reduce(
                    (acc, curr) => [...acc, ...curr],
                    []
                  )
                }
              ></ECGPlot>
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default Patients;
