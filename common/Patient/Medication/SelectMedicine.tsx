'use client';

import type { ClientComponentProps, OrganizationMedicineProps } from '@types';

const SelectMedicine: ClientComponentProps<OrganizationMedicineProps | any> = ({
  name,
  handleSelect,
}) => {
  return (
    <div
      onClick={() => handleSelect(name)}
      className="hover:patient: flex h-12 w-full shrink-0 cursor-pointer flex-col justify-center rounded-lg bg-gray-500 px-4 text-xs text-white transition duration-200 hover:superadmin:bg-theme-superadmin-primary hover:doctor:bg-theme-doctor-primary
      hover:patient:bg-theme-patient-primary
      hover:nurse:bg-theme-nurse-primary
      "
    >
      <span className="font-semibold">{name}</span>
    </div>
  );
};

export default SelectMedicine;
