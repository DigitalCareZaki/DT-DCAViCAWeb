'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

import { getPatientMeasurements } from '@actions';
import { setPatientMeasurementListingReducer } from '@slice';

import Header from './Header';
import Banner from './Banner';
import Table from './Table';
import Form from './Form';

import type { FC } from 'react';
import type { Props } from './types';
import type { PatientMeasurementProps } from '@types';

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const Measurements: FC<Props> = ({
  data,
  patient,
  type,
  fullHeight,
  leftPadding,
  hideActions,
  user,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [measurementsData, setMeasurementsData] = useState<PatientMeasurementProps[]>(data || []);

  useEffect(() => {
    const loadMeasurements = async () => {
      if (!patient || data) return; // If data is provided, don't fetch

      try {
        setLoading(true);
        const res = await getPatientMeasurements(patient, type, 1, 10);

        if (res.success) {
          setMeasurementsData(res.data);
          dispatch(setPatientMeasurementListingReducer({
            measurements: res.data,
            pagination: res.data?.pagination || {}
          }));
        }
      } catch (error) {
        console.error('Error loading measurements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeasurements();
  }, [patient, type, data, dispatch]);

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
    <div
      className={twMerge(
        'flex w-full flex-col gap-6 pt-6',
        // fullHeight ? 'h-screen' : 'h-full', // old code
        fullHeight ? 'h-full' : 'h-full',

        leftPadding && 'px-10 pr-0'
      )}
    >
      <Header hideActions={hideActions} data={measurementsData} />
      {/* <Banner patient={patient} type={type} /> */}
      <Table data={measurementsData} user={user} patient={patient} />
      <Form />
    </div>
  );
};

export default Measurements;
