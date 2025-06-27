'use server';

import Link from 'next/link';
import { ButtonPrimary, ExportButton } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Header: ServerComponentProps<Props> = async ({ userRole, data }) => {
  return (
    <div className="flex w-full justify-between px-4 py-4 sm:px-6 lg:px-8">
      <span className="screen-title text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
        Devices
      </span>
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
          data={data.map((el) => ({
            ...el,
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
          ]}
          filename="Devices List"
        />
      </div>
    </div>
  );
};

export default Header;
