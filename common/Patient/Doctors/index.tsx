'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPatientDoctors } from '@actions';
import { setPatientDoctorListReducer } from '@slice';

import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { FC } from 'react';
import type { Props } from './types';
import type { PatientDoctorsProps } from '@types';

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const DoctorPatientDoctors: FC<Props> = ({ patient }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PatientDoctorsProps[]>([]);

  useEffect(() => {
    const loadDoctors = async () => {
      if (!patient) return;

      try {
        setLoading(true);
        const res = await getPatientDoctors(patient, undefined, 'doctor');

        if (res.success) {
          setData(res?.data || []);
          dispatch(setPatientDoctorListReducer({ doctors: res?.data }));
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [patient, dispatch]);

  if (!patient) return <div>Patient id not define</div>;
  if (loading) return <div
    style={mainStyle} // Apply the zoom-out effect here
    className="flex h-full w-screen items-center justify-center bg-background"
  >
    <div
      className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  </div>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={data} />
      <Form />
    </div>
  );
};

export default DoctorPatientDoctors;
