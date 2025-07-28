'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

import { setUserReducer, setCurrentOrganizationReducer } from '@slice';
import { PrimaryHeader, DynamicSidebar, ModalBottom } from '@common';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const SuperAdminLayout: ClientComponentProps<Props> = ({
  user,
  children,
  organization,
}) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserReducer({ user }));
    }

    if (organization) {
      dispatch(setCurrentOrganizationReducer({ current: organization }));
    }
  }, [dispatch, user, organization]);

  // Shared scaling style
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Ensures scaling starts from the top-left corner
    width: '150%', // Compensate for the width scaling
    height: '150%', // Compensate for the height scaling
  };

  if (route?.includes('/superadmin/chat')) {
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

  if (route?.includes('/superadmin/settings')) {
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
            <DynamicSidebar renderKey="settings" />
            <div className="h-full flex-grow pl-4">{children}</div>
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  if (route?.includes('/superadmin/users')) {
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
            <DynamicSidebar renderKey="users" />
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

export default SuperAdminLayout;
