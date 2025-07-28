'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getPatientMedications } from '@actions';
import { setPatientMedicationListingReduer } from '@slice';

import Header from './Header';
import Table from './Table';
import Form from './Form';
import Pagination from './Pagination';

import type { FC } from 'react';
import type { Props } from './types';
import type { PatientMedicationProps } from '@types';

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const Medication: FC<Props> = ({
  patient,
  hideCreateMedicationBtn,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PatientMedicationProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const loadMedications = async () => {
      if (!patient) return;

      try {
        setLoading(true);
        const res = await getPatientMedications(patient, undefined);

        if (res.success) {
          setData(res.data);
          dispatch(setPatientMedicationListingReduer({ medications: res.data }));
        }
      } catch (error) {
        console.error('Error loading medications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedications();
  }, [patient, dispatch]);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!patient) return <div>Patient not define</div>;
  if (loading) return <div
    style={mainStyle} // Apply the zoom-out effect here
    className="flex h-full w-screen items-center justify-center bg-background"
  >
    <div
      className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  </div>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header
        hideCreateMedicationBtn={hideCreateMedicationBtn}
        data={data}
      />
      <Table data={currentData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
      <Form />
    </div>
  );
};

export default Medication;
