'use client';

import type { ChangeEvent, FormEvent } from 'react';
import type { DeviceProps } from 'types/data';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';
import getDevices from 'service/device/getDevices';
import { setDevices } from 'store/devices.slice';
import { useEffect, useState, useRef } from 'react';

interface HeaderProps {
  userRole: string;
  data: DeviceProps[];
}

const Header = ({ userRole, data }: HeaderProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (debounceRef.current) {
  //     clearTimeout(debounceRef.current);
  //   }
  //   debounceRef.current = setTimeout(async () => {
  //     try {
  //       const res = await getDevices(value);
  //       if (!res.success) return;
  //       dispatch(setDevices(res.data ?? []));
  //     } catch (err) {
  //       // Handle errors if needed
  //     }
  //   }, 300);
  //   return () => {
  //     if (debounceRef.current) clearTimeout(debounceRef.current);
  //   };
  // }, [value, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full justify-between px-4 py-4 sm:px-6 lg:px-8">
      {/* <span className="screen-title text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
        Devices
      </span> */}


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
        <div className="w-36 sm:w-48">
          <Link passHref href={`/${userRole}/devices/add`}>
            <ButtonPrimary
              title="Add Device"
              name="Add device"
              className="h-12 px-4 py-2 text-lg sm:text-xl lg:text-2xl"
            />
          </Link>
        </div>
        <ExportButton
          data={data.map((el: DeviceProps) => ({
            ...el,
            status: el.assigned === true ? "Assigned" : "Un Assigned",
            created_at: new Date(el.created_at).toLocaleDateString(),
            created_by: `${el.created_by.first_name} ${el.created_by.last_name}`,
          }))}
          headers={[
            {
              label: 'Title',
              key: 'title',
            },
            {
              label: 'Description',
              key: 'description',
            },
            {
              label: 'Serial',
              key: 'serial_number',
            },
            {
              label: 'Category',
              key: 'category',
            },
            {
              label: 'Created By',
              key: 'created_by',
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
          filename="Devices List"
        />
      </div>
    </div>
  );
};

export default Header;
