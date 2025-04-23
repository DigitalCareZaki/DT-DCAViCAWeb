'use server';

import { getPatientNurses, getUserTypeHeaders } from '@actions';
import { getPatientAppointments } from '@service';
import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const TelemedicineNurses: ServerComponentProps<any> = async ({
  patient,
}) => {
  console.log('patient >>>', patient);
  if (!patient) throw new Error('Patient not define');

  const type = await getUserTypeHeaders();

  // const res = await getPatientAppointments(patient, 1, 10);
  // console.log('res >>>', res);
  const res = {
    data: [
      {
        status: "ACTIVE",
        id: "02c51307-adea-40e0-894f-f49a649f9939",
        appointment: {
          id: "023b9d09-f8ad-426b-acd7-84278643f0f6",
          about: "CONSULTANCY",
          type: "ONLINE",
          title: "test case 001",
          start_date: "2025-04-29T00:00:00.000Z",
          end_date: "2025-04-30T00:00:00.000Z",
          description: null,
          organizer: {
            id: "0f73dccd-6794-4f83-bcd9-174bbd0b4108",
            first_name: "Haris",
            last_name: "Iqbal",
            middle_name: null,
            uri: null,
            role: "PATIENT"
          },
          participants: [
            {
              id: "02c51307-adea-40e0-894f-f49a649f9939"
            }
          ],
          appointmentObservation: {
            id: "74346c2b-3159-4f68-951c-cc6897798dca",
            Observations: "Observations dsafdsa",
            Diagnosis: "Diagnosis",
            Medications: "Prescribed Medications",
            Procedure: "Procedure Recommended",
            Follow_up_date: "2025-04-10T00:00:00.000Z"
          },
          created_at: "2025-04-22T00:00:00.000Z"
        }
      }
    ],
    pagination: {
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
      perPage: 10,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null
    }
  }

  console.log('res getPatientAppointments >>>', res);

  // if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={res} />
      <Form />
    </div>
  );
};

export default TelemedicineNurses;
