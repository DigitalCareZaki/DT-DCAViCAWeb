'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientMeasurementListingReducer } from '@slice';

import RenderTable from './RenderTable';
import { getPatientMeasurements } from '@service';
import { allPatientsMeasurements } from '@service';

import type { ClientComponentProps } from '@types';
import { twMerge } from 'tailwind-merge';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"


const Table: ClientComponentProps<any> = ({ data, user, patient }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(data.pagination);
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const allHeads = [
    'Title',
    'Date',
    'Time',
    'Measurement Type',
    'Status',
    'Update',
    'Log',
    'Mode',
    'Values',
    'Unit',
    'Source',
    'Patient',
    'Created By',
  ];

  const filteredHeads = user?.role === 'PATIENT'
    ? allHeads.filter(head => head !== 'Patient')
    : allHeads;


  const setData = (measurements: any, paginationData: any) => {
    dispatch(setPatientMeasurementListingReducer({ measurements, pagination: paginationData }));
  };

  useEffect(() => {
    setData(data, data.pagination);
  }, [data]);

  // const handlePageChange = async (page: number) => {
  //   setLoading(true); // Show loader
  //   setCurrentPage(page);

  //   const measurements = await getPatientMeasurements(
  //     patient,
  //     selectedTab === 'ALL' ? '' : selectedTab,
  //     page,
  //     pagination.perPage
  //   );

  //   setData(measurements?.data, measurements?.data?.pagination);
  //   setPagination(measurements?.data?.pagination);
  //   setLoading(false);
  // };

  // const handleTabChange = async (tab: string) => {
  //   setLoading(true);
  //   setSelectedTab(tab);
  //   setCurrentPage(1);

  //   const measurements = await getPatientMeasurements(
  //     patient,
  //     tab === 'ALL' ? '' : tab,
  //     1,
  //     pagination?.perPage
  //   );

  //   setData(measurements?.data, measurements?.data?.pagination);
  //   setPagination(measurements?.data?.pagination);
  //   setLoading(false);
  // };

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setCurrentPage(page);

    let measurements;

    if (patient) {
      measurements = await getPatientMeasurements(
        patient,
        selectedTab === 'ALL' ? '' : selectedTab,
        page,
        pagination.perPage
      );
    } else {
      measurements = await allPatientsMeasurements(
        selectedTab === 'ALL' ? '' : selectedTab,
        page,
        pagination.perPage
      );
    }

    setData(measurements?.data, measurements?.data?.pagination);
    setPagination(measurements?.data?.pagination);
    setLoading(false);
  };

  const handleTabChange = async (tab: string) => {
    setLoading(true);
    setSelectedTab(tab);
    setCurrentPage(1);

    let measurements;

    if (patient) {
      measurements = await getPatientMeasurements(
        patient,
        tab === 'ALL' ? '' : tab,
        1,
        pagination?.perPage
      );
    } else {
      measurements = await allPatientsMeasurements(
        tab === 'ALL' ? '' : tab,
        1,
        pagination?.perPage
      );
    }

    setData(measurements?.data, measurements?.data?.pagination);
    setPagination(measurements?.data?.pagination);
    setLoading(false);
  };


  return (
    <>
      <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
        <div className="flex justify-between space-x-2 mb-4">
          {['ALL', 'ECG', 'SPO2', 'BLOODPRESSURE', 'BLOODGLUCOSE', 'TEMPERATURE'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={twMerge(
                'hover:theme-bg-color flex h-full font-semibold w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-white p-3 transition duration-150 hover:text-white',
                selectedTab === tab && 'theme-bg-color text-white'
              )}
            // className={`px-4 py-2 rounded min-w-[350px] text-center ${selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
            //   }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table with Loader */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}

          <ClientTable
            heads={filteredHeads}
          >
            {!loading ? <RenderTable user={user} /> : <></>}

          </ClientTable>
        </div>

        {/* Pagination Controls */}
        {!loading && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination?.hasPrevPage}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-gray-700 font-medium">
                Page {pagination?.currentPage} of {pagination?.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination?.hasNextPage}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
              >
                <FaArrowRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Table;

// old code and very important
// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { ClientTable } from '@common';
// import { setPatientMeasurementListingReducer } from '@slice';

// import RenderTable from './RenderTable';
// import { getPatientMeasurements, getSinglePatientRag } from '@service';

// import type { TableProps } from './types';
// import type { ClientComponentProps, PatientMeasurementProps } from '@types';

// const Table: ClientComponentProps<any> = ({ data, user }) => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState(data.pagination);
//   console.log('data  Table ClientComponentProps>>', data);
//   const [selectedTab, setSelectedTab] = useState('ALL'); // Default tab

//   const setData = (measurements: any, paginationData: any) => {
//     dispatch(setPatientMeasurementListingReducer({ measurements, pagination: paginationData }));
//   };

//   useEffect(() => {
//     setData(data, data.pagination);
//   }, [data]);

//   const handlePageChange = async (page: number) => {
//     setCurrentPage(page);

//     const measurements = await getPatientMeasurements(
//       "cd4c8eaf-d734-4ff0-9364-d8eda51e4c56",
//       selectedTab,  // Ensure measurement type changes
//       page,
//       pagination.perPage
//     );

//     setData(measurements?.data, measurements?.data?.pagination);
//     setPagination(measurements?.data?.pagination);
//   };

//   const handleTabChange = async (tab: string) => {
//     setSelectedTab(tab);
//     setCurrentPage(1); // Reset page to first page

//     const measurements = await getPatientMeasurements(
//       "cd4c8eaf-d734-4ff0-9364-d8eda51e4c56",
//       tab,
//       1, // Reset to first page
//       pagination?.perPage
//     );

//     setData(measurements?.data, measurements?.data?.pagination);
//     setPagination(measurements?.data?.pagination);
//   };



//   return (
//     <>
//       <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">

//         <div className="flex space-x-2 mb-4">
//           {['ALL', 'ECG', 'SPO2', 'BLOODPRESSURE', 'BLOODGLUCOSE', 'TEMPERATURE'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => handleTabChange(tab)}
//               className={`px-4 py-2 rounded ${selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <ClientTable
//           heads={[
//             'Title',
//             'Date',
//             'Time',
//             'Measurement Type',
//             'Status',
//             'Update',
//             'Log',
//             'Mode',
//             'Values',
//             'Unit',
//             'Source',
//             'Patient',
//             'Created By',
//           ]}
//         >
//           <RenderTable user={user} />
//         </ClientTable>
//         {/* Pagination Controls */}
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={!pagination?.hasPrevPage}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>Page {pagination?.currentPage} of {pagination?.totalPages}</span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={!pagination?.hasNextPage}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Table;
