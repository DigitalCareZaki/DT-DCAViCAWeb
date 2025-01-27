'use client';

import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';

import { InputBasic } from '@common';
import { getOrganizationUsers } from '@service';
import { setOrganizationUsersReducer } from '@slice';

import { debounce } from '@init-globals';

import HeaderFilter from './HeaderFilter';

import type { ClientComponent, OrganizationUsersProps } from '@types';

const Header: ClientComponent = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const setUsers = (users: OrganizationUsersProps[]) =>
    dispatch(setOrganizationUsersReducer({ users }));

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>[]) => {
    const res = await getOrganizationUsers(
      e[0]?.target?.value,
      params?.get('role') ?? ''
    );
    setUsers(res?.data ?? []);
  }, 1000);

  return (
    <div className="mt-8 flex w-full items-center justify-between">
      <div className="flex w-72 sm:w-80 lg:w-96">
        <InputBasic
          placeholder="Search"
          icon="IoSearch"
          borderTheme
          onChange={handleSearch}
          className="text-lg sm:text-xl lg:text-2xl" // Adjusted for 1.5rem size
        />
      </div>
      <HeaderFilter />
    </div>
  );
};

export default Header;
