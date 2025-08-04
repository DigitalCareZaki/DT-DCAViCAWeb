'use client';

import { ChangeEvent, useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import {
  toggleDoctorMedicationReducer,
  setPatientMedicationListingReduer,
} from '@slice';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';

import type { ClientComponentProps, PatientMedicationProps } from '@types';

const MedicationHeader: ClientComponentProps<{
  hideCreateMedicationBtn?: boolean;
  data: PatientMedicationProps[];
  onSearch?: (searchValue: string) => void;
  searchLoading?: boolean;
}> = ({ hideCreateMedicationBtn, data, onSearch, searchLoading }) => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddContactsClick = () => {
    dispatch(toggleDoctorMedicationReducer());
  };

  const setData = (medications: PatientMedicationProps[]) =>
    dispatch(setPatientMedicationListingReduer({ medications }));

  const timeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  // Preserve focus during search operations
  useEffect(() => {
    if (searchLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchLoading]);

  // Prevent focus loss by maintaining focus on any re-render
  useEffect(() => {
    const handleFocusLoss = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        // Small delay to ensure the input is ready
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    // Listen for focus events on the document
    document.addEventListener('focusin', handleFocusLoss);

    // Also use a mutation observer to detect DOM changes that might cause focus loss
    const observer = new MutationObserver(() => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      document.removeEventListener('focusin', handleFocusLoss);
      observer.disconnect();
    };
  }, []);

  const debouncedSearch = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 500);
  }, [onSearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const onFocus = () => {
    // Ensure focus is maintained
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onBlur = () => {
    // Prevent blur by immediately refocusing
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Memoize the input component to prevent re-renders that cause focus loss
  const searchInput = useMemo(() => (
    <InputBasic
      ref={inputRef}
      placeholder="Search"
      icon="IoSearch"
      borderTheme
      value={inputValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={false} // Never disable the input to prevent focus loss
      className={searchLoading ? 'opacity-50' : ''}
    />
  ), [inputValue, onChange, onFocus, onBlur, searchLoading]);

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Medication</span>
      <div className="flex items-center gap-4">
        <div className="flex w-60">
          {searchInput}
        </div>
        <ExportButton
          data={data.map((el) => ({
            ...el,
            start_date: new Date(el.start_date).toDateString(),
            end_date: new Date(el.start_date).toDateString(),
            time: new Date(el.time).toLocaleTimeString(),
            doctor: `${el.doctor.user.first_name} ${el.doctor.user.last_name}`,
          }))}
          headers={[
            {
              label: 'Name',
              key: 'name',
            },
            {
              label: 'Start',
              key: 'start_date',
            },
            {
              label: 'End',
              key: 'end_date',
            },
            {
              label: 'Time',
              key: 'time',
            },
            {
              label: 'Dosage',
              key: 'dosage',
            },
            {
              label: 'Frequency',
              key: 'frequency',
            },
            {
              label: 'Unit',
              key: 'unit',
            },
            {
              label: 'Doctor',
              key: 'doctor',
            },
          ]}
          filename="Medication Data"
        />
        {!hideCreateMedicationBtn && (
          <div className="w-36">
            <ButtonPrimary
              title="Add Medication"
              name="Add Medication"
              className="text-md h-12 w-36 rounded-lg p-4"
              // variant="icon"
              // icon="IoMdAdd"
              onClick={handleAddContactsClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationHeader;
