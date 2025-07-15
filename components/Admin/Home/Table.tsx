'use client';

import { useEffect, useState } from 'react';
import { ExportButton, ClientTable } from '@common';
import { SuperAdminPatientListProps } from '@types';
import RenderTable from './RenderTable';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { getUserTypeHeaders } from '@actions';
import { getAdminPatient } from '@service';


const Table = () => {
  const [data, setData] = useState<SuperAdminPatientListProps[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null as number | null,
    prevPage: null as number | null,
  });
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('doctor');

  const fetchData = async (page: number = 1) => {
    setLoading(true);
    const userTypeHeader = await getUserTypeHeaders();
    const res = await getAdminPatient(page, 10);

    console.log('data with pagination client >>>>', res);

    if (res.success) {
      setUserType(userTypeHeader?.toLowerCase() ?? 'doctor');
      setData(res?.data);
      setPagination(res?.pagination);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(1); // Load page 1 initially
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      <ExportButton
        data={data.map((el) => ({
          emr: el.patient.emr,
          ...el,
        }))}
        headers={[
          { label: 'First name', key: 'first_name' },
          { label: 'Middle name', key: 'middle_name' },
          { label: 'Last name', key: 'last_name' },
          { label: 'EMR', key: 'emr' },
          { label: 'Email', key: 'email' },
        ]}
        filename="Patient List Data"
      />

      <div className="relative w-full overflow-x-auto pb-12 shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Patient Name',
            'Patient Email',
            'EMR',
            'Assign Doctor',
            'Department',
            'Height (in meters)',
            'Weight (in kg)',
          ]}
        >
          <RenderTable data={data} userType={userType} />
        </ClientTable>
        <div className="mt-6 flex justify-center items-center gap-6">
          {pagination.hasPrevPage && (
            <button
              onClick={() => handlePageChange(pagination.prevPage!)}
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              <MdArrowBackIos size={18} />
            </button>
          )}

          <span className="text-sm text-gray-700 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          {pagination.hasNextPage && (
            <button
              onClick={() => handlePageChange(pagination.nextPage!)}
              className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              <MdArrowForwardIos size={18} />
            </button>
          )}
        </div>
      </div>


    </div>
  );
};

export default Table;



// 'use server';

// import { getUserTypeHeaders } from '@actions';
// import { getAdminPatient } from '@service';

// import { ServerTable, ExportButton } from '@common';

// import RenderTable from './RenderTable';

// import type { ServerComponent } from '@types';

// const Table: ServerComponent = async () => {
//   const userType = await getUserTypeHeaders();
//   const res = await getAdminPatient();

//   console.log('data with pagination >>>>', res);

//   if (!res.success) return <></>;

//   return (
//     <div className="flex h-full w-full flex-col items-end gap-4">
//       <ExportButton
//         data={res.data.map((el) => ({
//           emr: el.patient.emr,
//           ...el,
//         }))}
//         headers={[
//           {
//             label: 'First name',
//             key: 'first_name',
//           },
//           {
//             label: 'Middle name',
//             key: 'middle_name',
//           },
//           {
//             label: 'Last name',
//             key: 'last_name',
//           },
//           {
//             label: 'EMR',
//             key: 'emr',
//           },
//           {
//             label: 'Email',
//             key: 'email',
//           },
//         ]}
//         filename="Patient List Data"
//       />

//       <div className="relative w-full overflow-x-auto pb-12 shadow-md sm:rounded-lg">
//         <ServerTable
//           heads={[
//             'Patient Name',
//             'Patient Email',
//             'EMR',
//             'Assign Doctor',
//             'Department',
//             // 'Glucose',
//             // 'Blood Pressure',
//             // 'Temperature',
//             // 'Pulse Oximeter',
//             // 'ECG',
//             // 'Medication',
//             'Height (in meters)',
//             'Weight (in kg)',
//           ]}
//         >
//           <RenderTable
//             userType={userType?.toLowerCase() ?? 'doctor'}
//             data={res.data}
//           />
//         </ServerTable>
//       </div>
//     </div>
//   );
// };

// export default Table;
