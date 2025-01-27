'use client';

import { type ChangeEvent } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { setBranchesReducer } from '@slice';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';
import { getSuperAdminBranches } from '@service';
import { debounce } from '@init-globals';

import type { ClientComponentProps, BranchesDataProps } from '@types';
import type { HeaderProps } from './types';

const Header: ClientComponentProps<HeaderProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (branches: BranchesDataProps[]) =>
    dispatch(setBranchesReducer({ branches }));

  const onChange = debounce(async (e: ChangeEvent<HTMLInputElement>[]) => {
    const value = e[0].target.value;

    const res = await getSuperAdminBranches(value);

    setData(res.data);
  }, 1000);

  return (
    <div className="mt-8 flex w-full items-center justify-between">
      <div className="w-full">
        <InputBasic
          placeholder="Search"
          icon="IoSearch"
          borderTheme
          onChange={onChange}
        />
      </div>
      <div className="flex w-fit gap-4">
        <div className="w-32">
          <Link prefetch href="/superadmin/branches/add" passHref>
            <ButtonPrimary variant="icon" name="Add Branch" icon="IoMdAdd" />
          </Link>
        </div>
        <ExportButton
          data={data.map((el) => ({
            ...el,
            address: `${el.location.address}`,
          }))}
          headers={[
            {
              label: 'Name',
              key: 'name',
            },
            {
              label: 'Email',
              key: 'email',
            },
            {
              label: 'Phone',
              key: 'phone_number',
            },
            {
              label: 'Address',
              key: 'address',
            },
            {
              label: 'Created By',
              key: 'created_by',
            },
          ]}
          filename="Branch List"
        />
      </div>
    </div>
  );
};

export default Header;
