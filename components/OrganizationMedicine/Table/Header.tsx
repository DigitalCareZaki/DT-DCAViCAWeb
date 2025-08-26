'use client';

import { ChangeEvent, useRef, useState } from 'react';

import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonPrimary } from '@common';
import MedicineModal from './MedicineModal';
import { addOrganizationMedicine, addAdminOrganizationMedicine } from '@service';
import { addOrganizationMedicineAndUpdate } from '../../../store/organizationMedicine.thunks';
import { useUser } from '@selectors';

import type { ClientComponent } from '@types';

const Header: ClientComponent = () => {
  const [user] = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDownload = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Name\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'medicines.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          (async () => {
            const res = await addOrganizationMedicine(
              btoa(
                JSON.stringify({
                  names: results.data.map((el: any) => el?.Name),
                })
              )
            );
          })();
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleAddMedicinesClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddMedicine = async (medicine: string) => {
    const res = await dispatch<any>(addOrganizationMedicineAndUpdate(medicine));
    if (!res?.success) {
      throw new Error(res?.message || 'Failed to add medicine');
    }
    setIsModalOpen(false);
  };

  if (!user?.role) return <></>;

  return (
    <div className="mt-10 flex w-full justify-end gap-4">
      <MedicineModal isOpen={isModalOpen} onClose={handleCloseModal} onAdd={handleAddMedicine} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv"
        style={{ display: 'none' }}
      />
      <div className="w-fit">
        <ButtonPrimary
          title="Add Medicines"
          name="Add medicines"
          className="p-4 text-lg"
          onClick={handleAddMedicinesClick}
        />
      </div>
      <div className="w-fit">
        <ButtonPrimary
          title="Download Sheet"
          name="Download sheet"
          className="p-4 text-lg"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

export default Header;
