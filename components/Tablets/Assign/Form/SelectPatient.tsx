'use client';

import { getName } from '@init-globals';

import type { PatientData } from './types';
import type { ClientComponentProps } from '@types';

const SelectPatient: ClientComponentProps<PatientData | any> = ({
  id,
  first_name,
  last_name,
  email,
  middle_name,
  handleSelectPatient,
}) => {
  return (
    <div
      onClick={() =>
        handleSelectPatient({ id, first_name, middle_name, last_name, email })
      }
      className="flex h-12 w-full shrink-0 cursor-pointer flex-col justify-center rounded-lg px-4 text-xs text-white transition duration-200 superadmin:bg-theme-superadmin-primary hover:superadmin:bg-theme-superadmin-primary/50 admin:bg-theme-admin-primary hover:admin:bg-theme-admin-primary/50 doctor:bg-theme-doctor-primary hover:doctor:bg-theme-doctor-primary/50 nurse:bg-theme-nurse-primary hover:nurse:bg-theme-nurse-primary/50
    "
    >
      <span className="font-semibold">
        {getName({
          first_name,
          last_name,
          middle_name,
        })}
      </span>
      <span className=" text-[10px] text-fuchsia-200">{email}</span>
    </div>
  );
};

export default SelectPatient;
