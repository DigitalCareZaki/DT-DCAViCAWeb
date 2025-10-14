'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';

import { getName } from '@init-globals';

// import type { RootState } from '@store-types';

const AdminAppointmentsRenderTable = () => {
    // Use correct property name from reducer
    const appointments = useSelector((state: any) => state.patients.setPatientAppointmentsListing);
    console.log('appointments >>>>>>>', appointments);

    if (!appointments || appointments.length === 0) {
        return (
            <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No appointments found
                </td>
            </tr>
        );
    }

    return (
        <>
            {appointments.map((appointment: any, index: number) => (
                <tr
                    key={appointment.id || index}
                    className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                >
                    {/* Title */}
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                        {appointment.title || 'N/A'}
                    </th>
                    {/* Description */}
                    <td className="px-6 py-4 text-gray-500">
                        {appointment.description || 'N/A'}
                    </td>
                    {/* Type */}
                    <td className="px-6 py-4 text-gray-500">
                        {appointment.type || 'N/A'}
                    </td>
                    {/* About */}
                    <td className="px-6 py-4 text-gray-500">
                        {appointment.about || 'N/A'}
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'ACTIVE'
                                ? 'bg-blue-100 text-blue-800'
                                : appointment.status === 'PENDING'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : appointment.status === 'CANCELLED'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-800'
                            }`}>
                            {appointment.status || 'N/A'}
                        </span>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default AdminAppointmentsRenderTable;
