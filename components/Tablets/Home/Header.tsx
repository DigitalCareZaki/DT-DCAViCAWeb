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
}

const Header = ({ userRole }: HeaderProps) => {
  const dispatch = useDispatch();
  const tablets = useSelector((state: ReduxProps) => state.tablets.tablets);
  const [value, setValue] = useState<string>('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await getTablets(1, 10, value);
        if (!res.success) return;
        dispatch(setTablets(res.data ?? []));
      } catch (err) {
        // Handle errors if needed
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full justify-between">
      <form onSubmit={onSubmit} className="flex w-full max-w-xs sm:max-w-md">
        <InputBasic
          placeholder="Search"
          icon="IoSearch"
          borderTheme
          onChange={onChange}
          value={value}
          className="text-base sm:text-lg md:text-xl px-4 py-2"
        />
      </form>
      <div className="flex w-fit flex-row gap-4">
        <ExportButton
          data={tablets.map((el: TabletProps) => ({
            ...el,
            created_by: `${el.created_by.first_name} ${el.created_by.last_name}`,
            issued_to: el.patient_tablets
              .map(
                (el) =>
                  `${el.issued_to.user.first_name} ${el.issued_to.user.last_name}`
              )
              .join(', '),
            created_at: new Date(el.created_at).toLocaleString(),
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
              label: 'Issued to',
              key: 'issued_to',
            },
          ]}
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
