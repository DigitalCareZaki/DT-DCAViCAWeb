'use client';

import type { ChangeEvent, FormEvent } from 'react';
import type { TabletProps } from 'types/data';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';
import getTablets from 'service/tablets/getTablets';
import { setTablets } from 'store/tablets.slice';
import { useEffect, useState, useRef } from 'react';
import type { ReduxProps } from 'store/types';

interface HeaderProps {
  userRole: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Header = ({ userRole, searchTerm, setSearchTerm }: HeaderProps) => {
  const dispatch = useDispatch();
  const tablets = useSelector((state: ReduxProps) => state.tablets.tablets);

  console.log('tablets >>>>', tablets);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full justify-between">
      <form onSubmit={onSubmit} className="flex w-full max-w-xs sm:max-w-md">
        <InputBasic
          placeholder="Search by title or serial number..."
          icon="IoSearch"
          borderTheme
          onChange={onChange}
          value={searchTerm}
          className="text-base sm:text-lg md:text-xl px-4 py-2"
        />
      </form>
      <div className="flex w-fit flex-row gap-4">
        <ExportButton
          data={tablets.map((el: TabletProps) => ({
            ...el,
            status: el?.patient_tablets[0]?.issued_to ? 'Assigned' : 'Un Assigned',
            branch: el.branch?.name || '',
            created_at: new Date(el.created_at).toLocaleDateString(),
            created_by: `${el.created_by.first_name} ${el.created_by.last_name}`,
          }))}
          headers={[
            {
              label: 'Title',
              key: 'title',
            },
            {
              label: 'Serial',
              key: 'serial_number',
            },
            {
              label: 'Created By',
              key: 'created_by',
            },
            {
              label: 'Branch',
              key: 'branch',
            },
            {
              label: 'Status',
              key: 'status',
            },
            {
              label: 'Added On',
              key: 'created_at',
            },
          ]}
          filename="Accessories List"
        />
        <Link passHref href={`/${userRole}/tablets/add`}>
          <ButtonPrimary
            title="Add Accessories"
            name="Add Accessories"
            className="font-bold text-xl h-12 w-56 p-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
