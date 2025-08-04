'use client';

import { ChangeEvent, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import {
  toggleDoctorMedicationReducer,
  setPatientMedicationListingReduer,
} from '@slice';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';

import type { ClientComponentProps, PatientMedicationProps } from '@types';

const MedicationHeader: ClientComponentProps<{
  hideCreateMedicationBtn?: boolean;
  data: PatientMedicationProps[];
  onSearch?: (searchValue: string) => void;
  searchLoading?: boolean;
}> = ({ hideCreateMedicationBtn, data, onSearch, searchLoading }) => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddContactsClick = () => {
    dispatch(toggleDoctorMedicationReducer());
  };

  const setData = (medications: PatientMedicationProps[]) =>
    dispatch(setPatientMedicationListingReduer({ medications }));

  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedSearch = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 500);
  }, [onSearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Medication</span>
      <div className="flex items-center gap-4">
        <div className="flex w-60">
          <InputBasic
            placeholder="Search"
            icon="IoSearch"
            borderTheme
            onChange={onChange}
            disabled={searchLoading}
            className={searchLoading ? 'opacity-50' : ''}
          />
        </div>
        <ExportButton
          data={data.map((el) => ({
            ...el,
            start_date: new Date(el.start_date).toDateString(),
            end_date: new Date(el.start_date).toDateString(),
            time: new Date(el.time).toLocaleTimeString(),
            doctor: `${el.doctor.user.first_name} ${el.doctor.user.last_name}`,
          }))}
          headers={[
            {
              label: 'Name',
              key: 'name',
            },
            {
              label: 'Start',
              key: 'start_date',
            },
            {
              label: 'End',
              key: 'end_date',
            },
            {
              label: 'Time',
              key: 'time',
            },
            {
              label: 'Dosage',
              key: 'dosage',
            },
            {
              label: 'Frequency',
              key: 'frequency',
            },
            {
              label: 'Unit',
              key: 'unit',
            },
            {
              label: 'Doctor',
              key: 'doctor',
            },
          ]}
          filename="Medication Data"
        />
        {!hideCreateMedicationBtn && (
          <div className="w-36">
            <ButtonPrimary
              title="Add Medication"
              name="Add Medication"
              className="text-md h-12 w-36 rounded-lg p-4"
              // variant="icon"
              // icon="IoMdAdd"
              onClick={handleAddContactsClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationHeader;
