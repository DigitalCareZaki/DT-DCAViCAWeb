'use client';

import { useSelector } from 'react-redux';

import { useCallback, useState } from 'react';
import { getName } from '@init-globals';
import type { ClientComponent } from '@types';
import type { ReduxProps, StorePatientState } from '@store-types';
import { CircleSpinner } from 'react-spinners-kit';
import { IoDownload } from '@react-icons/all-files/io5/IoDownload';
import jsPDF from 'jspdf';
const RenderTable: ClientComponent = () => {
  const { setPatientAppointmentsListing } = useSelector<any, any>(
    (state) => state.patients
  );
  const [loading, setLoading] = useState<boolean>(false);
  console.log('testing Check>>>', setPatientAppointmentsListing);

  const handleDownload = (observation: any) => {
    const doc = new jsPDF();

    const content = `
  Appointment Observation Report
  
    Observations: ${observation?.Observations}
    Diagnosis: ${observation?.Diagnosis}
    Medications: ${observation?.Medications}
    Procedure: ${observation?.Procedure}
    Follow-up Date: ${new Date(observation?.Follow_up_date).toLocaleDateString()}
  `;

    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save('appointment_observation.pdf');
  };

  return (
    <>
      {setPatientAppointmentsListing?.map((el: any) => {
        const appointment = el?.appointment;
        const organizer = appointment?.organizer;
        const observation = appointment?.appointmentObservation;

        return (
          <tr
            key={el?.id}
            className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
          >
            <td className="px-6 py-4">{appointment?.title}</td>
            <td className="px-6 py-4">{appointment?.description || 'N/A'}</td>
            <td className="px-6 py-4">{appointment?.type}</td>
            <td className="px-6 py-4">
              {new Date(appointment?.start_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              {new Date(appointment?.end_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">{el?.status}</td>
            <td className="px-6 py-4">
              {organizer?.first_name} {organizer?.last_name}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div
                onClick={() => handleDownload(observation)}
                className="theme-bg-color flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition duration-200 hover:scale-[110%]"
              >
                <IoDownload size={16} />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default RenderTable;
