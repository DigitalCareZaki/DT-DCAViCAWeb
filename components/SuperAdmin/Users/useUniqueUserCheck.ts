'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { checkUserUnique } from '@service';
import {
  formatPhoneNumberToE164,
  getInternationalPhoneNumberError,
  normalizePhoneNumberInput,
} from '../../../utils/phoneNumber';

import type {
  CheckUserUniqueParams,
  UserUniqueField,
  UserUniqueRole,
} from '../../../service/superadmin/checkUserUnique';

export type UserUniqueFormField =
  | 'email'
  | 'phoneNumber'
  | 'username'
  | 'npi_number'
  | 'pmdc_number';

export type UserUniqueErrors = Record<UserUniqueFormField, string>;

export type UserUniqueChecking = Record<UserUniqueFormField, boolean>;

const emptyErrors: UserUniqueErrors = {
  email: '',
  phoneNumber: '',
  username: '',
  npi_number: '',
  pmdc_number: '',
};

const emptyExists: Record<UserUniqueFormField, boolean> = {
  email: false,
  phoneNumber: false,
  username: false,
  npi_number: false,
  pmdc_number: false,
};

const emptyChecking: UserUniqueChecking = {
  email: false,
  phoneNumber: false,
  username: false,
  npi_number: false,
  pmdc_number: false,
};

const formFieldByApiField: Record<UserUniqueField, UserUniqueFormField> = {
  email: 'email',
  phone_number: 'phoneNumber',
  username: 'username',
  npi_number: 'npi_number',
  pmdc_number: 'pmdc_number',
};

const apiFieldByFormField: Record<UserUniqueFormField, UserUniqueField> = {
  email: 'email',
  phoneNumber: 'phone_number',
  username: 'username',
  npi_number: 'npi_number',
  pmdc_number: 'pmdc_number',
};

const fallbackMessages: UserUniqueErrors = {
  email: 'Email already exists',
  phoneNumber: 'Phone number already exists',
  username: 'Username already exists',
  npi_number: 'NPI number already exists',
  pmdc_number: 'PMDC number already exists',
};

type UseUniqueUserCheckProps<TValues> = {
  role: UserUniqueRole;
  fields: UserUniqueFormField[];
  getValues: () => TValues;
};

const getFieldValue = (
  values: Record<string, any>,
  field: UserUniqueFormField
) => {
  if (field === 'phoneNumber') {
    const normalizedPhoneNumber = normalizePhoneNumberInput(
      values.phoneNumber || ''
    );

    return getInternationalPhoneNumberError(normalizedPhoneNumber)
      ? ''
      : formatPhoneNumberToE164(normalizedPhoneNumber);
  }

  return values[field]?.toString() ?? '';
};

function useUniqueUserCheck<TValues extends Record<string, any>>({
  role,
  fields,
  getValues,
}: UseUniqueUserCheckProps<TValues>) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef<number>(0);
  const [errors, setErrors] = useState<UserUniqueErrors>(emptyErrors);
  const [exists, setExists] =
    useState<Record<UserUniqueFormField, boolean>>(emptyExists);
  const [checking, setChecking] = useState<UserUniqueChecking>(emptyChecking);

  const getParams = useCallback((): CheckUserUniqueParams | null => {
    const values = getValues();
    const params: CheckUserUniqueParams = { role };

    fields.forEach((field) => {
      const value = getFieldValue(values, field).trim();

      if (value) {
        params[apiFieldByFormField[field]] = value;
      }
    });

    return Object.keys(params).length > 1 ? params : null;
  }, [fields, getValues, role]);

  const clearField = useCallback((field: UserUniqueFormField) => {
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
    setExists((prev) => ({
      ...prev,
      [field]: false,
    }));
  }, []);

  const checkUniqueValues = useCallback(
    async (activeField?: UserUniqueFormField) => {
      const params = getParams();

      if (!params) {
        setErrors(emptyErrors);
        setExists(emptyExists);
        setChecking(emptyChecking);
        return false;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setChecking(
        activeField
          ? {
            ...emptyChecking,
            [activeField]: true,
          }
          : emptyChecking
      );

      try {
        const res = await checkUserUnique(params);

        if (requestIdRef.current !== requestId) {
          return false;
        }

        if (!res.success) {
          return false;
        }

        setErrors((prev) => {
          const next = { ...prev };

          Object.entries(res.fields).forEach(([apiField, result]) => {
            const formField = formFieldByApiField[apiField as UserUniqueField];

            if (!formField || !result.checked) return;

            next[formField] = result.exists
              ? result.message || fallbackMessages[formField]
              : '';
          });

          return next;
        });

        setExists((prev) => {
          const next = { ...prev };

          Object.entries(res.fields).forEach(([apiField, result]) => {
            const formField = formFieldByApiField[apiField as UserUniqueField];

            if (!formField || !result.checked) return;

            next[formField] = result.exists;
          });

          return next;
        });

        return !res.available;
      } catch {
        return false;
      } finally {
        if (requestIdRef.current === requestId) {
          setChecking(emptyChecking);
        }
      }
    },
    [getParams]
  );

  const scheduleUniqueCheck = useCallback(
    (field: UserUniqueFormField) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        checkUniqueValues(field);
      }, 500);
    },
    [checkUniqueValues]
  );

  const handleUniqueFieldChange = useCallback(
    (field: UserUniqueFormField, value: string) => {
      requestIdRef.current += 1;

      const cleanValue =
        field === 'phoneNumber'
          ? normalizePhoneNumberInput(value)
          : value.trim();
      const shouldClear =
        !cleanValue ||
        (field === 'phoneNumber' &&
          !!getInternationalPhoneNumberError(cleanValue));

      if (shouldClear) {
        clearField(field);
      }

      scheduleUniqueCheck(field);
    },
    [clearField, scheduleUniqueCheck]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return {
    uniqueErrors: errors,
    uniqueChecking: checking,
    hasUniqueConflict: Object.values(exists).some(Boolean),
    checkUniqueValues,
    handleUniqueFieldChange,
  };
}

export default useUniqueUserCheck;
