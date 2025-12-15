'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { ExportButton, ClientTable, InputBasic } from '@common';
import { SuperAdminPatientListProps } from '@types';
import RenderTable from './RenderTable';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { getUserTypeHeaders } from '@actions';
import { getAdminPatient } from '@service';
import { debounce } from '@init-globals';


const Table = () => {
  const [data, setData] = useState<SuperAdminPatientListProps[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 1,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null as number | null,
    prevPage: null as number | null,
  });
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('doctor');
  const [search, setSearch] = useState('');

  const fetchData = async (page: number = 1, searchQuery?: string) => {
    setLoading(true);
    const userTypeHeader = await getUserTypeHeaders();
    const res = await getAdminPatient(page, 10, searchQuery !== undefined ? searchQuery : search);
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
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchData(page);
  };

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>[]) => {
    const value = e[0].target.value;
    setSearch(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchData(1, value);
  }, 1000);




  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      <div className="flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
        <div className="w-full sm:w-96">
          <InputBasic
            label=""
            placeholder="Search for the records"
            icon="IoSearch"
            title="Search"
            // loading={loading}
            onChange={(e: any) => handleSearch(e)}
          />
        </div>
        <ExportButton
          data={data.map((el) => ({
            patient_name: el?.first_name + ' ' + el?.middle_name + ' ' + el?.last_name,
            patient_email: el?.email,
            emr: el.patient.emr,
            assigned_doctor: `${el.patient.first_assigned_doctor?.user.first_name ? el.patient.first_assigned_doctor?.user.first_name : ""} ${el.patient.first_assigned_doctor?.user.middle_name ? el.patient.first_assigned_doctor?.user.middle_name : ""} ${el.patient.first_assigned_doctor?.user.last_name ? el.patient.first_assigned_doctor?.user.last_name : ""}`,
            department: el.patient?.doctors?.[0]?.departments?.[0]?.title ?? '',
            height: el.patient.height,
            weight: el.patient.weight,
            ...el,
          }))}
          headers={[
            { label: 'Patient Name', key: 'patient_name' },
            { label: 'Patient Email', key: 'patient_email' },
            { label: 'EMR', key: 'emr' },
            { label: 'Assigned Doctor', key: 'assigned_doctor' },
            { label: 'Department', key: 'department' },
            { label: 'Height (in meters)', key: 'height' },
            { label: 'Weight (in kg)', key: 'weight' },
          ]}
          filename="Patient List Data"
        />
      </div>

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
              className="p-2 rounded-full border border-gray-300"
            >
              <MdArrowBackIos size={18} color="black" />
            </button>
          )}

          <span className="text-sm text-gray-700 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          {pagination.hasNextPage && (
            <button
              onClick={() => handlePageChange(pagination.nextPage!)}
              className="p-2 rounded-full border border-gray-300"
            >
              <MdArrowForwardIos size={18} color="black" />
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
