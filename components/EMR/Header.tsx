'use client';

import { type ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { debounce } from '@init-globals';
import { getPatientEMRRecords } from '@service';
import { InputBasic, ButtonPrimary } from '@common';
import { setEmrRecordsSlice } from '@slice';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';

const Header: ClientComponentProps<{ patient_id?: string }> = ({
  patient_id,
}) => {
  const [user] = useUser();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = debounce(
    async (event: ChangeEvent<HTMLInputElement>[]) => {
      const value = event[0].target.value;

      try {
        setLoading(true);
        const res = await getPatientEMRRecords(patient_id ?? '', value);

        if (!res.success) return;

        dispatch(setEmrRecordsSlice({ records: res.data }));
      } catch (err: any) {
        console.log(err?.message);
      } finally {
        setLoading(false);
      }
    },
    1000
  );

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6">
      {/* <div className="mb-4 w-full sm:mb-0 sm:w-auto">
        <InputBasic
          label=""
          placeholder="Search for the records"
          icon="IoSearch"
          title="Search"
          loading={loading}
          onChange={handleSearch}
        />
      </div> */}
      <div className="flex w-full flex-wrap gap-4 sm:w-auto">
        {user.role === 'PATIENT' && (
          <>
            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Add Family History"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>
            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Add Patient History"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>

            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Add Surgical History"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>

            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Add Medication History"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>

            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Diagnosis"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>

            <Link passHref href="/patient/emr/add">
              <ButtonPrimary
                title="add record"
                name="Add Record"
                icon="IoMdAdd"
                variant="icon"
                className="w-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 sm:w-48"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
