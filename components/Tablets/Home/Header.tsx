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

  console.log('tablets >>>>', tablets);
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
            status: el.assigned === true ? "Assigned" : "Un Assigned",
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
