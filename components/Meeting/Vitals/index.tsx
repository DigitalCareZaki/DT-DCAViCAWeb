'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import { IoClose } from '@react-icons/all-files/io5/IoClose';

import { TooltipBasic } from '@common';
import { toggleDoctorAppointmentPatientVitalsReducer } from '@slice';
import Levels from './Levels';
import { getVitals } from '@service';

import type { ClientComponentProps } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { Props } from './types';

// const Chart = dynamic(() => import('../../../common/Charts/ECGBasic'), {
//   ssr: false,
// });

// const generateECGData = (numPoints: number): number[] => {
//   const data = [];
//   for (let i = 0; i < numPoints; i++) {
//     // Simulate a basic ECG waveform
//     const baseValue = 0.5;
//     const amplitude = 0.2; // Adjust for desired amplitude
//     const noise = Math.random() * 0.1 - 0.05; // Random noise
//     const value = baseValue + amplitude * Math.sin((i * Math.PI) / 20) + noise;
//     data.push(value);
//   }
//   return data;
// };

interface VitalsData {
  id: string;
  title: string;
  status: string;
  updated_status: number | null;
  mode: string;
  updated_status_at: string | null;
  updated_status_by: string | null;
  type: string;
  values: number[];
  unit: string;
  reading_source: string;
  created_at: string;
  patient: {
    user: {
      id: string;
      email: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    };
  };
  doctor: {
    user: {
      id: string;
      email: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    };
  } | null;
  nurse: any;
}

const Vitals: ClientComponentProps<Props> = ({ data, appointmentId }) => {
  const dispatch = useDispatch();
  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );
  const [vitalsData, setVitalsData] = useState<VitalsData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () =>
    dispatch(toggleDoctorAppointmentPatientVitalsReducer());

  useEffect(() => {
    const fetchVitals = async () => {
      if (global.modals.doctorAppointmentPatientVitals) {
        setLoading(true);
        try {
          // Use the appointmentId prop if available
          const id = appointmentId;

          const response = await getVitals(id);

          if (response.success && response.data) {
            setVitalsData(response.data || []);
          }
        } catch (error) {
          console.error('Error fetching vitals:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVitals();
  }, [global.modals.doctorAppointmentPatientVitals]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LOW':
        return 'text-red-500';
      case 'HIGH':
        return 'text-red-500';
      case 'ALERT_NOT_SET':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <AnimatePresence>
      {global.modals.doctorAppointmentPatientVitals && (
        <div className="absolute left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-black/30">
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: 'keyframes',
              duration: 0.3,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
            className="flex h-[60%] w-[60%] flex-col gap-6 rounded-2xl bg-dark-secondary p-5 shadow-xl"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-t-color-secondary">
                  Vitals
                </span>
                <span className="text-xs text-gray-400">{vitalsData[0]?.patient?.user?.first_name} {vitalsData[0]?.patient?.user?.middle_name} {vitalsData[0]?.patient?.user?.last_name}</span>
              </div>

              <TooltipBasic title="Close">
                <div
                  onClick={handleClose}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-dark-main text-gray-400 transition duration-300 hover:bg-t-color-secondary hover:text-white"
                >
                  <IoClose />
                </div>
              </TooltipBasic>
            </div>

            <Levels data={data} />

            <div className={`flex-1 ${vitalsData.length > 10 ? 'overflow-auto' : ''}`}>
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-t-color-secondary">Loading vitals...</div>
                </div>
              ) : (
                <div className={`${vitalsData.length > 10 ? 'overflow-x-auto max-h-96' : 'overflow-x-auto'}`}>
                  <table className="w-full min-w-full border-collapse border border-gray-700">
                    <thead>
                      <tr className="bg-dark-main">
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Title
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Type
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Values
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Unit
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Status
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-sm font-medium text-t-color-secondary">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitalsData?.map((vital) => (
                        <tr key={vital?.id} className="border-b border-gray-700 hover:bg-dark-main/50">
                          <td className="border border-gray-700 px-4 py-2 text-sm text-gray-300">
                            {vital?.title}
                          </td>
                          <td className="border border-gray-700 px-4 py-2 text-sm text-gray-300">
                            {vital?.type}
                          </td>
                          <td className="border border-gray-700 px-4 py-2 text-sm text-gray-300">
                            {vital?.values?.join(', ')}
                          </td>
                          <td className="border border-gray-700 px-4 py-2 text-sm text-gray-300">
                            {vital?.unit}
                          </td>
                          <td className="border border-gray-700 px-4 py-2 text-sm">
                            <span className={getStatusColor(vital?.status)}>
                              {vital?.status}
                            </span>
                          </td>
                          <td className="border border-gray-700 px-4 py-2 text-sm text-gray-300">
                            {formatDate(vital?.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Vitals;
