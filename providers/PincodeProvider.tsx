'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Pincode } from '@components';
import { getUser } from '@service';

import type { ClientComponentProps, ChildrenComponentProps } from '@types';

const IDLE_TIMEOUT = 1000 * 60 * 5; // 5 minutes

const PincodeProvider: ClientComponentProps<ChildrenComponentProps> = ({
  children,
  user,
}) => {
  const timerRef = useRef<any | null>(null);
  const [requiredPincode, setIsRequiredPincode] = useState<boolean>(false);

  const handleReset = useCallback(() => {
    setIsRequiredPincode(false);
    localStorage.setItem('requiredPincode', JSON.stringify('false'));
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsRequiredPincode(true);
    }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => {
    if (!user?.isPincode) return;

    const events = ['mousemove', 'keypress', 'click', 'touchstart'];
    events.forEach((event) => document.addEventListener(event, resetIdleTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        document.removeEventListener(event, resetIdleTimer)
      );
    };
  }, [user, resetIdleTimer]);

  useEffect(() => {
    if (requiredPincode) {
      localStorage.setItem('requiredPincode', JSON.stringify(requiredPincode));
    }
  }, [requiredPincode]);

  useEffect(() => {
    const storedPincode = localStorage.getItem('requiredPincode');
    setIsRequiredPincode(storedPincode === 'true');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (requiredPincode) {
      interval = setInterval(async () => {
        try {
          await getUser();
        } catch (error) {
          // Keep-alive failed
        }
      }, 1000 * 60 * 2); // 2 minutes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [requiredPincode]);

  return (
    <>
      <Pincode
        show={requiredPincode}
        key={requiredPincode.toString()}
        handleReset={handleReset}
      />
      {children}
    </>
  );
};

export default PincodeProvider;
