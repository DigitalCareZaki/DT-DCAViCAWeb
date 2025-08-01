'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { IoClose } from '@react-icons/all-files/io5/IoClose';

import { TooltipBasic } from '@common';
import { toggleDoctorAppointmentPatientVitalsReducer } from '@slice';
import Levels from './Levels';

import type { ClientComponentProps } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { Props } from './types';

const Chart = dynamic(() => import('../../../common/Charts/ECGBasic'), {
  ssr: false,
});

const generateECGData = (numPoints: number): number[] => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    // Simulate a basic ECG waveform
    const baseValue = 0.5;
    const amplitude = 0.2; // Adjust for desired amplitude
    const noise = Math.random() * 0.1 - 0.05; // Random noise
    const value = baseValue + amplitude * Math.sin((i * Math.PI) / 20) + noise;
    data.push(value);
  }
  return data;
};

const Vitals: ClientComponentProps<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const global = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const handleClose = () =>
    dispatch(toggleDoctorAppointmentPatientVitalsReducer());

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
            className="flex h-[70%] w-[70%] flex-col gap-6 rounded-2xl bg-dark-secondary p-5 shadow-xl"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-t-color-secondary">
                  Vitals
                </span>
                <span className="text-xs text-gray-400">Syed Azeem Javed</span>
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
            <div className="h-32 w-full">
              <Chart data={generateECGData(100)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Vitals;
