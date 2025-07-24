'use client';

import { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react'; // Import hooks for state and event handling
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
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // Ref for debounce timer

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      try {
        // Fetch all departments if input is empty, else search
        const res = await getDepartments(value);
        if (!res.success) return;
        dispatch(setDepartmentsReducer({ data: res.data ?? [] }));
      } catch (err) {
        // Handle errors if needed
      }
    }, 300); // 300ms debounce
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, dispatch]);

  // Handle changes in the search input
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Keep form submit for accessibility, but do nothing (debounce handles search)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
