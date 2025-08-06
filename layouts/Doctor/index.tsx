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
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const DoctorLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();
  const [reduxUser] = useUser();

  useEffect(() => {
    if (!user) return;
    dispatch(setUserReducer({ user }));
  }, [dispatch, user]);

  const currentUser = reduxUser || user;


  // Shared styles for the main layout (applying the zoom-out effect)
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left',
    width: '150%', // Compensates for the width scaling
    height: '150%', // Compensates for the height scaling
    position: 'relative' as const,
    zIndex: 0, // Base z-index for the scaled container
  };

  if (
    route?.includes('/doctor/telemed/appointment') ||
    route?.includes('/doctor/chat')
  ) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background px-6 pt-4 pb-2">
            <PrimaryHeader user={currentUser!} />
          </div>
          {/* Scrollable Content */}
          <div className="flex flex-grow h-0 w-full overflow-hidden">
            {children}
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  // old code 
  // if (
  //   route?.includes('/doctor/telemed/appointment') ||
  //   route?.includes('/doctor/chat')
  // ) {
  //   return (
  //     <main style={mainStyle} className="relative h-full w-screen gap-4 bg-dark-main overflow-scroll">
  //       {children}
  //       <ModalBottom />
  //     </main>
  //   );
  // }
  if (route?.includes('/doctor/telemed')) {
    return (
      <div className="relative h-full w-screen">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background p-6 pb-2">
            <PrimaryHeader user={currentUser!} />
          </div>
          {/* Scrollable Content */}
          <div className="flex flex-grow h-full w-full px-6">
            <TelemedSidebar userType={currentUser?.type} />
            <div className="h-full w-[95%]">{children}</div>
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  if (!route?.includes('/doctor/patient')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background p-6 pb-2">
            <PrimaryHeader user={currentUser!} />
          </div>
          {/* Scrollable Content */}
          <div className="flex flex-grow h-0 w-full overflow-y-auto px-6">
            {children}
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <main
        style={mainStyle}
        className="flex flex-col h-screen w-full bg-background"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background p-6 pb-2">
          <PrimaryHeader user={currentUser!} />
        </div>
        {/* Scrollable Content */}
        <div className="flex flex-grow h-0 w-full overflow-y-auto px-6">
          <PatientSidebar />
          <div className="h-full w-[95%]">{children}</div>
        </div>
        <ModalBottom />
      </main>
    </div>
  );
};

export default DoctorLayout;
