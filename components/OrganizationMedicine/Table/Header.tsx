'use client';

import { ChangeEvent, useRef } from 'react';

import Papa from 'papaparse';

import { ButtonPrimary } from '@common';

import { addOrganizationMedicine } from '@service';
import { useUser } from '@selectors';

import type { ClientComponent } from '@types';

const Header: ClientComponent = () => {
  const [user] = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    fileInputRef.current?.click();
  };

  if (!user?.role) return <></>;

  return (
    <div className="mt-10 flex w-full justify-end gap-4">
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
