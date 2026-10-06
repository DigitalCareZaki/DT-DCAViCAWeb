'use client';

import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { PrimaryHeader, ModalBottom, TelemedSidebar } from '@common';
import { setUserReducer } from '@slice';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const PatientLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();
  const [reduxUser] = useUser();

  useEffect(() => {
    if (user) {
      dispatch(setUserReducer({ user }));
    }
  }, [dispatch, user]);

  const currentUser = reduxUser || user;

  // Styles for replicating a zoom-out effect
  const mainStyle = {
    transform: 'scale(0.67)', // Scale to 67%
    transformOrigin: 'top left', // Set origin to top-left to mimic zoom-out behavior
    width: '150%', // Compensate for the reduced width due to scaling
    height: '150%', // Compensate for the reduced height due to scaling
  };

  // Live call opens in its own tab, so it renders without the header
  const isMeetingRoute = route?.includes('/patient/telemed/appointment');

  if (isMeetingRoute || route?.includes('/patient/chat')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          {!isMeetingRoute && (
            <div className="sticky top-0 z-50 bg-background px-6 pt-4 pb-2">
              <PrimaryHeader user={currentUser!} />
            </div>
          )}
          {/* Scrollable Content */}
          <div className="flex flex-grow h-0 w-full overflow-hidden">
            {children}
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  if (route?.includes('/patient/telemed')) {
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
            <TelemedSidebar userType={currentUser?.type} />
            <div className="h-full w-[95%]">{children}</div>
          </div>
          <ModalBottom />
        </main>
      </div>
      // <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6 overflow-y-scroll">
      //   <div className="flex h-full w-full">
      //     <TelemedSidebar userType={user?.type} />
      //     <div className="h-full flex-grow">{children}</div>
      //   </div>
      //   <ModalBottom />
      // </main>
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
          {children}
        </div>
        <ModalBottom />
      </main>
    </div>
  );
};

export default PatientLayout;
