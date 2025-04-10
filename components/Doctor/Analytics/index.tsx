'use server';

import { PageInfo } from '@common';
import { getRequestedAppointments, getUser } from '@service';
import Table from './Table';
import type { ServerComponentProps } from '@types';
import { PrimaryHeader, ServerGenerator } from '@common';
import { BiLoaderAlt } from 'react-icons/bi';


const Analytics: ServerComponentProps<any> = async () => {


    const user = await getUser();
    const res = await getRequestedAppointments();

    console.log('check analytics res >>>>', res.data);
    if (!res.success) return <></>;



    return (
        //     <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
        //     {user ? (
        //       <PrimaryHeader user={user as any} />
        //     ) : (
        //       <BiLoaderAlt />
        //     )}
        //     <Topbar userType={userType as UserRole} />
        //     <div className="grid w-full grid-cols-4 flex-wrap gap-4 1000:grid-cols-3 1300:grid-cols-4 1600:grid-cols-5">
        //       <ServerGenerator data={res.data} dynamicWidth>
        //         <Patient />
        //       </ServerGenerator>
        //     </div>
        //   </div>
        <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
            {user ? (
                <PrimaryHeader user={user as any} />
            ) : (
                <BiLoaderAlt />
            )}
            <span className="text-md font-semibold text-gray-600">Analytics</span>
            {/* <PageInfo /> */}
            {/* <Header patient_id={patient_id} />
      <Table records={res.data} /> */}
            <Table records={[]} />
        </div>
    );
};

export default Analytics;
