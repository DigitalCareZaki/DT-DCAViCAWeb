'use client';

import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { useRouter, usePathname } from 'next/navigation';

import { InputBasic } from '@common';

import type { ClientComponentProps } from '@types';
import type { HeaderProps } from './types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Header: ClientComponentProps<HeaderProps> = ({ type, search }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pathname) return;

    if (value.trim()) {
      router.push(pathname + '?search=' + encodeURIComponent(value));
    } else {
      router.push(pathname);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (!pathname) return;

    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        router.push(pathname + '?search=' + encodeURIComponent(value));
      } else {
        router.push(pathname);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [value, pathname, router]);

  useEffect(() => {
    if (!search) {
      setValue('');
      return;
    }

    setValue(search);
  }, [search]);

  return (
    <div className="flex w-full flex-col gap-4 border-b pb-8">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">
          {type?.split('')[0].toUpperCase()}
          {type?.slice(1, type.length)}
        </h1>
      </div>
      <form onSubmit={handleSearch} className="w-full">
        <InputBasic
          icon="IoSearch"
          placeholder="Search"
          borderTheme
          inputWrapperClassName="bg-background"
          inputClassName="bg-background"
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
};

export default Header;
