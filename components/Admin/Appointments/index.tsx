'use server';

import { PageInfo } from '@common';
import AdminAppointmentsTable from './AdminAppointmentsTable';

import type { ServerComponent } from '@types';

const AdminAppointments: ServerComponent = async () => {
    return (
        <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
            {/* <PageInfo
                title="Appointments"
                description="Manage all appointments in your organization"
            /> */}
            <AdminAppointmentsTable />
        </div>
    );
};

export default AdminAppointments;
