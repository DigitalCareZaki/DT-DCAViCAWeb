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

const NurseLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user) return;
      dispatch(setUserReducer({ user }));
    })();
  }, [dispatch, user]);

  // Shared scaling style
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Ensures scaling starts from the top-left corner
    width: '150%', // Compensates for the width scaling
    height: '150%', // Compensates for the height scaling
  };

  if (
    route?.includes('/nurse/telemed/appointment') ||
    route?.includes('/nurse/chat')
  ) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background px-6 pt-4 pb-2">
            <PrimaryHeader user={user!} />
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

  if (route?.includes('/nurse/telemed')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background p-6 pb-2">
            <PrimaryHeader user={user!} />
          </div>
          {/* Scrollable Content */}
          <div className="flex flex-grow h-0 w-full overflow-y-auto px-6">
            <TelemedSidebar userType={user?.type} />
            <div className="h-full w-[95%]">{children}</div>
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  if (route?.includes('/nurse/patient')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-background p-6 pb-2">
            <PrimaryHeader user={user!} />
          </div>
          {/* Scrollable Content */}
          <div className="flex flex-grow h-0 w-full overflow-y-auto px-6">
            <PatientSidebar />
            <div className="h-full flex-grow">{children}</div>
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
          <PrimaryHeader user={user!} />
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

export default NurseLayout;
