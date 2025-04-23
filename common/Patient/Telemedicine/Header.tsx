'use client';

import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleDoctorPatientNurseReducer,
  setPatientNurseListingReducer,
} from '@slice';
import { getPatientNurses } from '@actions';

import { InputBasic, ButtonPrimary } from '@common';
import { debounce } from '@init-globals';

import type { ClientComponent, PatientNursesProps } from '@types';
import { useSearchParams } from 'next/navigation';

const DoctorPatientNursesHeader: ClientComponent = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddNurseClick = () => {
    dispatch(toggleDoctorPatientNurseReducer());
  };
  const setNurse = (nurses: PatientNursesProps[]) =>
    dispatch(setPatientNurseListingReducer({ nurses }));

  const onChange = debounce(async (event: ChangeEvent<HTMLInputElement>[]) => {
    const value = event[0].target.value;
    try {
      const res = await getPatientNurses(
        params?.get('patient')?.toString() || '',
        value
      );

      setNurse(res.data);
    } catch (err) {}
  }, 1000);

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Nurses</span>
      <div className="flex w-fit items-center gap-4">
        <div className="flex w-60">
          <InputBasic
            placeholder="Search"
            icon="IoSearch"
            borderTheme
            onChange={onChange}
          />
        </div>
        <div className="w-36">
          <ButtonPrimary
            title="Add Nurse"
            name="Add Nurse"
            className="h-10 rounded-lg"
            variant="icon"
            icon="IoMdAdd"
            onClick={handleAddNurseClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientNursesHeader;
