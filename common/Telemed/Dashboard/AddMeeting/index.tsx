'use client';
import { useEffect, useState } from 'react';
import { getUser, getRequestedAppointments } from '@service';
import Header from '../components/Header';
import Form from './Form';
import { BiLoaderAlt } from 'react-icons/bi';
import { PrimaryHeader } from '@common';
import type { UserProps } from 'types/user';
import type { RequestedAppointmentProps } from 'types/data';

const AddMeeting = () => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [appointments, setAppointments] = useState<RequestedAppointmentProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [userRes, appointmentsRes] = await Promise.all([
        getUser(),
        getRequestedAppointments(),
      ]);
      setUser(userRes);
      setAppointments(appointmentsRes.data || []);
    }
    fetchData();
  }, []);


  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      {/* {user ? <PrimaryHeader user={user as any} /> : <BiLoaderAlt />} */}
      <div className="flex w-full justify-center">
        <div className="w-[70%] transform scale-90">
          <Form user={user} appointments={appointments} setAppointments={setAppointments} />
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;