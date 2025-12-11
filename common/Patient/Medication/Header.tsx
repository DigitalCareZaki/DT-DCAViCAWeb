'use client';

import { ChangeEvent, useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import {
  toggleDoctorMedicationReducer,
  setPatientMedicationListingReduer,
} from '@slice';
import { InputBasic, ButtonPrimary, ExportButton } from '@common';
import { exportPatientMedications } from '@actions';

import type { ClientComponentProps, PatientMedicationProps } from '@types';

const MedicationHeader: ClientComponentProps<{
  hideCreateMedicationBtn?: boolean;
  data: PatientMedicationProps[];
  onSearch?: (searchValue: string) => void;
  searchLoading?: boolean;
  patientId?: string;
}> = ({ hideCreateMedicationBtn, data, onSearch, searchLoading, patientId }) => {
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
  const [exportData, setExportData] = useState<any[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

  // Reset export data when patient changes
  useEffect(() => {
    setExportData([]);
  }, [patientId]);

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

  // Handle export with API call - fetch data when export button is hovered
  const handleExportHover = useCallback(async () => {
    if (!patientId || exportData.length > 0) return; // Only fetch once if data already exists

    try {
      setExportLoading(true);
      const res = await exportPatientMedications(patientId);

      if (res.success && res.data) {
        const formattedData = res.data.map((el: PatientMedicationProps) => ({
          ...el,
          start_date: new Date(el.start_date).toDateString(),
          end_date: new Date(el.end_date).toDateString(),
          time: Array.isArray(el.time) ? el.time.join(', ') : el.time,
          doctor: `${el.doctor.user.first_name} ${el.doctor.user.last_name}`,
        }));
        setExportData(formattedData);
      }
    } catch (error) {
      console.error('Error exporting medications:', error);
      // Fallback to current data if API fails
      const formattedData = data.map((el) => ({
        ...el,
        start_date: new Date(el.start_date).toDateString(),
        end_date: new Date(el.end_date).toDateString(),
        time: Array.isArray(el.time) ? el.time.join(', ') : el.time,
        doctor: `${el.doctor.user.first_name} ${el.doctor.user.last_name}`,
      }));
      setExportData(formattedData);
    } finally {
      setExportLoading(false);
    }
  }, [patientId, data, exportData.length]);

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
        <div onMouseEnter={handleExportHover}>
          <ExportButton
            data={exportData.length > 0 ? exportData : data.map((el) => ({
              ...el,
              start_date: new Date(el.start_date).toDateString(),
              end_date: new Date(el.end_date).toDateString(),
              time: Array.isArray(el.time) ? el.time.join(', ') : el.time,
              doctor: `${el.doctor.user.first_name} ${el.doctor.user.last_name}`,
              created_at: el.created_at.toLocaleString(),
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
                label: 'Frequency',
                key: 'frequency',
              },
              {
                label: 'Dosage',
                key: 'dosage',
              },
              {
                label: 'Unit',
                key: 'unit',
              },
              {
                label: 'Doctor',
                key: 'doctor',
              },
              {
                label: 'Created At',
                key: 'created_at',
              }

            ]}
            filename="Medication Data"
          />
        </div>
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
