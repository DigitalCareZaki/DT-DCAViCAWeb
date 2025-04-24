'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  toggleDoctorPatientDoctorReducer,
  setPatientDoctorListReducer,
} from '@slice';

import { InputBasic, ButtonPrimary } from '@common';
import { debounce } from '@init-globals';
import { getPatientDoctors } from '@service';

import type { ClientComponent, PatientDoctorsProps } from '@types';
import type { ChangeEvent } from 'react';

const DoctorPatientDoctorsHeader: ClientComponent = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddDoctorClick = () => {
    dispatch(toggleDoctorPatientDoctorReducer());
  };

  const setData = (doctors: PatientDoctorsProps[]) =>
    dispatch(setPatientDoctorListReducer({ doctors }));

  const onChange = debounce(async (e: ChangeEvent<HTMLInputElement>[]) => {
    try {
      const value = e[0].target.value;
      const res = await getPatientDoctors(params?.get('patient') || '', value);

      setData(res.data);
    } catch (err) { }
  }, 1000);

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Doctors</span>
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
            title="Add Doctor"
            name="Add Doctor"
            className="h-10 rounded-lg"
            variant="icon"
            icon="IoMdAdd"
            onClick={handleAddDoctorClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDoctorsHeader;
