'use client';

import { InputBasic, ExportButton } from '@common';

import type { ClientComponentProps } from '@types';
import type { HeaderProps } from './types';

const Header: ClientComponentProps<any> = ({ data }) => {

  console.log('check the data >>>', data);

  return (
    <div className="flex h-fit w-full flex-col items-start gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="w-full md:w-auto">
        <span className="screen-title text-lg font-semibold md:text-xl lg:text-2xl">
          Patients
        </span>
      </div>
      <div className="w-full md:w-auto">
        <div className="flex flex-row items-center gap-4">
          <InputBasic
            placeholder="Name, email or ID"
            icon="IoSearch"
            borderTheme
          />
          <ExportButton
            data={data?.data?.map((el: any) => ({
              emr: el?.emr,
              ...el.user,
            }))}
            headers={[
              {
                label: 'First name',
                key: 'first_name',
              },
              {
                label: 'Middle name',
                key: 'middle_name',
              },
              {
                label: 'Last name',
                key: 'last_name',
              },
              {
                label: 'EMR',
                key: 'emr',
              },
              {
                label: 'Email',
                key: 'email',
              },
              {
                label: 'Phone',
                key: 'phone_number',
              },
            ]}
            filename="Patient List Data"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
