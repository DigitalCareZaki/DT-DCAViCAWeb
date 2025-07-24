'use server';

import Link from 'next/link';

import { ButtonPrimary, ExportButton } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Header: ServerComponentProps<Props> = async ({ data, userRole }) => {
  return (
    <div className="flex w-full justify-between">
      <span className="screen-title"></span>
      <div className="flex w-fit flex-row gap-4">
        <ExportButton
          data={data.map((el) => ({
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
