'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import {
  PrimaryHeader,
  PatientSidebar,
  ModalBottom,
  TelemedSidebar,
} from '@common';
import { setUserReducer } from '@slice';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const DoctorLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(setUserReducer({ user }));
  }, [dispatch, user]);

  // Shared styles for the main layout (applying the zoom-out effect)
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left',
    width: '150%', // Compensates for the width scaling
    height: '150%', // Compensates for the height scaling
    // Prevents overflow artifacts due to scaling
  };

  if (
    route?.includes('/doctor/telemed/appointment') ||
    route?.includes('/doctor/chat')
  ) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-dark-main overflow-scroll">
        {children}
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/doctor/telemed')) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6 overflow-y-scroll">
        <div className="flex h-full w-full">
          <TelemedSidebar userType={user?.type} />
          <div className="h-full w-[95%]">{children}</div>
        </div>
        <ModalBottom />
      </main>
    );
  }

  if (!route?.includes('/doctor/patient')) {
    return (
      <main style={mainStyle} className="h-full w-screen gap-4 bg-background p-6">
        <PrimaryHeader user={user!} />
        {children}
        <ModalBottom />
      </main>
    );
  }

  return (
    <main style={mainStyle} className="h-full w-screen gap-4 bg-background p-6">
      <PrimaryHeader user={user!} />
      <div className="flex h-full w-full">
        <PatientSidebar />
        <div className="h-full w-[95%]">{children}</div>
      </div>
      <ModalBottom />
    </main>
  );
};

export default DoctorLayout;
