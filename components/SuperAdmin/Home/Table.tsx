'use client';
import { useEffect, useState } from 'react';
import { getUserTypeHeaders } from '@actions';
import { getOrganizationPatients } from '@service';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { ClientTable, ExportButton } from '@common';
import RenderTable from './RenderTable';


const Table = () => {

  const [data, setData] = useState<any>([]);
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

  const fetchData = async (page: number = 1) => {
    setLoading(true);
    const userTypeHeader = await getUserTypeHeaders();
    const res = await getOrganizationPatients(page, 10);
    console.log('getOrganizationPatients res >>>>', res.data);

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

  console.log('data >>>', data);



  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      <ExportButton
        data={data?.map((el: any) => ({
          emr: el.emr,
          ...el.patient,
        }))}
        headers={[
          {
            label: 'First name',
            key: 'first_name',
          },
          {
            label: 'Middle name',
            key: 'middle_name',
          },
          {
            label: 'Last name',
            key: 'last_name',
          },
          {
            label: 'EMR',
            key: 'emr',
          },
          {
            label: 'Email',
            key: 'email',
          },
          {
            label: 'Phone',
            key: 'phone_number',
          },
        ]}
        filename="Patient List Data"
      />

      <div className="relative w-full overflow-y-scroll pb-12 shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Patient Name',
            'Patient Email',
            'EMR',
            'Glucose',
            'Blood Pressure',
            'Temperature',
            'Pulse Oximeter',
            'ECG',
            'Medication',
            'Height',
            'Weight',
          ]}
        >
          <RenderTable
            userType={userType?.toLowerCase() ?? 'doctor'}
            data={data}
          />
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
