'use client';

import { ChangeEvent, FormEvent, useState } from 'react'; // Import hooks for state and event handling
import Link from 'next/link'; // Import Link for navigation
import { useDispatch } from 'react-redux'; // Import Redux dispatch for state management

import { InputBasic, ButtonPrimary } from '@common'; // Import reusable components
import { getDepartments } from '@service'; // Import the service to fetch departments
import { setDepartmentsReducer } from '@slice'; // Import action to update departments in the store
import { useUser } from '@selectors'; // Import the user selector to get user data

import type { ClientComponent } from '@types'; // Import ClientComponent type for TypeScript typing

const Header: ClientComponent = () => {
  const [user] = useUser(); // Get the user data
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const [value, setValue] = useState<string>(''); // State for the search input value

  // Handle changes in the search input
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Handle form submission to search departments
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!value) return; // Don't submit if the search input is empty

      const res = await getDepartments(value); // Fetch departments based on search input

      if (!res.success) return; // Return if the request fails
      dispatch(setDepartmentsReducer({ data: res.data ?? [] })); // Update Redux store with fetched data
    } catch (err) {
      // Handle any errors here
    }
  };

  return (
    <div className="mt-8 flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Form for department search */}
      <form onSubmit={onSubmit} className="flex w-full max-w-xs sm:max-w-md">
        {/* Input component with increased font size and padding for readability */}
        <InputBasic
          placeholder="Search"
          icon="IoSearch"
          borderTheme
          onChange={onChange}
          value={value}
          className="text-base sm:text-lg md:text-xl px-4 py-2"
        />
      </form>

      {/* Create button with responsive size */}
      <div className="w-32 sm:w-36 lg:w-40">
        <Link
          passHref
          href={`/${user.role?.toLocaleLowerCase()}/departments/create`}
        >
          {/* Button with readable font size */}
          <ButtonPrimary title="Create" name="Create" className="text-base sm:text-lg md:text-xl py-2 px-4" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
