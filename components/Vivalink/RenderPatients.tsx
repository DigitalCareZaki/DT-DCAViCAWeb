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
          {patches?.length > 1 ? (
            <select
              className={twMerge(
                'mt-1 w-full max-w-[220px] rounded border border-blue-300 bg-white/50 px-1 py-0.5 text-[10px] font-medium text-blue-800 outline-none transition-all focus:ring-1 focus:ring-blue-400',
                name === selectedPatient.name && 'bg-blue-100/30 text-white border-blue-400'
              )}
              value={name === selectedPatient.name ? selectedPatient.selectedPatch : patches[0]}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                handleSetSelectedPatient(name, e.target.value);
              }}
            >
              {patches.map((v, pIdx) => (
                <option key={pIdx} value={v} className="text-black">
                  {v}
                </option>
              ))}
            </select>
          ) : (
            patches?.map((v, pIdx) => (
              <p
                key={pIdx}
                className={twMerge(
                  'text-[10px] font-light text-gray-500',
                  name === selectedPatient.name && 'text-white'
                )}
              >
                {v}
              </p>
            ))
          )}
        </div>
      </div>
    )
  );
};

export default RenderPatients;
