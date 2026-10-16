'use client';

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleSpinner } from 'react-spinners-kit';
import { twMerge } from 'tailwind-merge';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import { FaUserMd } from '@react-icons/all-files/fa/FaUserMd';

import { ClientGenerator } from '@common';
import { useDebounce } from '@hooks';
import { getName } from '@init-globals';

import SelectUser, { UserAvatar } from './SelectUser';

import type { ClientComponentProps, SearchTelemedResProps } from '@types';

const SEARCH_DELAY = 500;

const DoctorDropdown: ClientComponentProps<Props> = ({
  users,
  loading,
  selected,
  onSearch,
  handleSelectUser,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search.trim(), SEARCH_DELAY);
  // Covers both the debounce window and the request itself
  const isSearching = loading || search.trim() !== debouncedSearch;

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = useCallback(
    (user: SearchTelemedResProps) => {
      handleSelectUser(user);
      setShow(false);
      setSearch('');
    },
    [handleSelectUser]
  );

  const handleClear = useCallback(() => {
    setSearch('');
    searchRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;

    setShow(false);
    triggerRef.current?.focus();
  }, []);

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Enter inside the search box would otherwise submit the appointment form
      if (event.key === 'Enter') event.preventDefault();
    },
    []
  );

  return (
    <div
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      className="relative flex w-full flex-col gap-2 text-lg"
    >
      <span className="text-lg font-medium text-teal-900">Select Doctor</span>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={show}
        onClick={() => setShow((prev) => !prev)}
        className={twMerge(
          'flex h-12 w-full items-center gap-3 rounded-lg border border-teal-200 bg-white px-4 text-left font-poppins transition duration-150 hover:border-teal-300',
          show && 'border-teal-400 ring-4 ring-teal-400/10'
        )}
      >
        {selected ? (
          <>
            <UserAvatar
              first_name={selected.first_name}
              last_name={selected.last_name}
              className="h-8 w-8 text-xs"
            />
            <span className="flex min-w-0 flex-1 items-baseline gap-2">
              <span className="truncate text-lg font-medium text-teal-900">
                {getName(selected)}
              </span>
              <span className="truncate text-sm text-teal-700/70">
                {selected.email}
              </span>
            </span>
          </>
        ) : (
          <>
            <FaUserMd size={18} className="shrink-0 text-teal-500" />
            <span className="flex-1 truncate text-lg text-teal-900/60">
              Select a doctor
            </span>
          </>
        )}
        <IoChevronDown
          size={18}
          className={twMerge(
            'shrink-0 text-teal-500 transition-transform duration-200',
            show && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -6,
            }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-teal-100 bg-white font-poppins shadow-xl shadow-teal-900/10"
          >
            <div className="border-b border-teal-50 p-2">
              <div className="flex h-11 items-center gap-2 rounded-lg bg-teal-50/70 px-3 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-teal-300">
                <IoSearch size={18} className="shrink-0 text-teal-500" />
                <input
                  ref={searchRef}
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search by name or email"
                  className="h-full w-full bg-transparent text-base text-teal-900 outline-none placeholder:text-teal-900/40"
                />
                {isSearching ? (
                  <CircleSpinner size={16} color="#14b8a6" />
                ) : (
                  search.length > 0 && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={handleClear}
                      className="flex shrink-0 rounded-full p-1 text-teal-500 transition hover:bg-teal-100"
                    >
                      <IoClose size={16} />
                    </button>
                  )
                )}
              </div>
            </div>
            <div
              className={twMerge(
                'hidescrollbar flex max-h-64 flex-col gap-1 overflow-y-auto p-2 transition-opacity duration-150',
                isSearching && users.length > 0 && 'opacity-60'
              )}
            >
              {users.length > 0 ? (
                <ClientGenerator
                  data={users}
                  selectedId={selected?.id}
                  handleSelectUser={handleSelect}
                >
                  <SelectUser />
                </ClientGenerator>
              ) : (
                <div className="flex flex-col items-center gap-1 py-8 text-center">
                  {isSearching ? (
                    <span className="text-sm text-teal-700/70">
                      Searching doctors...
                    </span>
                  ) : (
                    <>
                      <span className="text-base font-medium text-teal-900">
                        No doctors found
                      </span>
                      <span className="text-sm text-teal-700/70">
                        {search.trim()
                          ? 'Try a different name or email'
                          : 'There are no doctors available to book'}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Props {
  users: SearchTelemedResProps[];
  loading?: boolean;
  selected?: SearchTelemedResProps;
  onSearch: (query: string) => void;
  handleSelectUser: (user: SearchTelemedResProps) => void;
}

export default DoctorDropdown;
