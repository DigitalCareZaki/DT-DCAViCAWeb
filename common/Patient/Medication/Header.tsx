'use client';

import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import {
  toggleDoctorMedicationReducer,
  setPatientMedicationListingReduer,
} from '@slice';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';
import { debounce } from '@init-globals';
import { getPatientMedications } from '@service';

import type { ClientComponentProps, PatientMedicationProps } from '@types';

const MedicationHeader: ClientComponentProps<{
  hideCreateMedicationBtn?: boolean;
  data: PatientMedicationProps[];
}> = ({ hideCreateMedicationBtn, data }) => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddContactsClick = () => {
    dispatch(toggleDoctorMedicationReducer());
  };

  const setData = (medications: PatientMedicationProps[]) =>
    dispatch(setPatientMedicationListingReduer({ medications }));

  const onChange = debounce(async (e: ChangeEvent<HTMLInputElement>[]) => {
    const value = e[0].target.value;

    const res = await getPatientMedications(
      params?.get('patient')?.toString() ?? '',
      value
    );

    if (!res.success) return;

    setData(res.data);
  }, 1000);

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Medication</span>
      <div className="flex w-fit items-center gap-4">
        <div className="flex w-60">
          <InputBasic
            placeholder="Search"
            icon="IoSearch"
            borderTheme
            onChange={onChange}
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
              className="h-12 w-fit rounded-lg p-4"
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
