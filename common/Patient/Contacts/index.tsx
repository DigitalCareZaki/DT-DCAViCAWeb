'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ContactTable from './Table';
import Header from './Header';
import Form from './Form';

import { getPatientContacts } from '@actions';
import { setPatientContactListReducer } from '@slice';

import type { PatientContactsProps } from '@types';
import type { Props } from './types';
import type { FC } from 'react';

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const Contacts: FC<Props> = ({ patient }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PatientContactsProps[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      if (!patient) return;
      try {
        setLoading(true);
        const res = await getPatientContacts(patient, undefined, 'doctor');
        if (res.success) {
          setData(res.data);
          dispatch(setPatientContactListReducer({ contacts: res.data }));
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, [patient, dispatch]);

  if (!patient) return <div>Patient undefined</div>;
  if (loading) return <div
    style={mainStyle} // Apply the zoom-out effect here
    className="flex h-full w-screen items-center justify-center bg-background"
  >
    <div
      className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  </div>

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <ContactTable data={data} />
      <Form />
    </div>
  );
};

export default Contacts;
