'use client';

import { twMerge } from 'tailwind-merge';

import type { VLAllPatients } from '@types';
import type { RenderPatientsProps } from './types';

const RenderPatients = ({
  patients,
  selectedPatient,
  handleSetSelectedPatient,
}: RenderPatientsProps) => {
  return Object.entries(patients).map(
    ([name, patches]: [string, string[]], idx: number) => (
      <>
        <div
          key={idx}
          className={twMerge(
            'h-20 w-64 cursor-pointer rounded-lg bg-gradient-to-tl from-blue-400/30 to-theme-doctor-primary/20 shadow-lg backdrop-blur-sm transition ease-in-out hover:bg-theme-doctor-primary/20',
            name === selectedPatient.name &&
              'border border-blue-400 bg-blue-700/50'
          )}
          onClick={() => handleSetSelectedPatient(name)}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p
              className={twMerge(
                'text-bold text-theme-doctor-primary',
                name === selectedPatient.name && 'text-black'
              )}
            >
              {name}
            </p>
            {patches?.map((v, idx) => (
              <p
                key={idx}
                className={twMerge(
                  'text-xs font-light text-gray-500',
                  name === selectedPatient.name && 'text-white'
                )}
              >
                {v}
              </p>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default RenderPatients;
