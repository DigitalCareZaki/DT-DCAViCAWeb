'use client';

import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { verifyPincode } from '@service';

import type { UsePincodeProps } from './types';

const isNumber = new RegExp(/^[0-9]+$/);

const usePincode: UsePincodeProps = (handleReset) => {
  const [pincode, setPincode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleValidate = useCallback((pincode: string) => {
    if (!pincode?.trim()?.length) {
      setError('Please enter pincode');
      return true;
    }

    if (!isNumber.test(pincode)) {
      setError('Pincode only contains numbers');
      return true;
    }

    if (pincode?.length !== 6) {
      setError('Pincode should be 6 digits');
      return true;
    }

    setError('');

    return false;
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPincode(e.target.value);
      handleValidate(e.target.value);
    },
    [handleValidate]
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (handleValidate(pincode)) return;

        setLoading(true);

        const encodedPincode = btoa(JSON.stringify({ pincode }));
        const response = await verifyPincode(encodedPincode);

        if (!response.success) {
          setError(response.message || 'Pincode is incorrect');
          return;
        }

        setPincode('');
        setError('');
        handleReset();
      } catch (err) {
        console.log('pincode error >>>>', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [handleValidate, pincode, handleReset]
  );

  return [pincode, error, loading, onChange, onSubmit];
};

export default usePincode;
