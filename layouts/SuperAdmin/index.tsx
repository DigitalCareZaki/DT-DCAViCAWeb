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
    overflow: 'hidden', // Prevent overflow from scaling artifacts
  };

  if (route?.includes('/superadmin/chat')) {
    return (
      <main
        style={mainStyle}
        className="relative h-full w-screen gap-4 bg-dark-main"
      >
        {children}
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/superadmin/settings')) {
    return (
      <main
        style={mainStyle}
        className="relative h-full w-screen gap-4 bg-background p-6"
      >
        <PrimaryHeader user={user!} />
        <div className="flex h-full w-full">
          <DynamicSidebar renderKey="settings" />
          <div className="h-full flex-grow pl-4">{children}</div>
        </div>
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/superadmin/users')) {
    return (
      <main
        style={mainStyle}
        className="relative h-full w-screen gap-4 bg-background p-6"
      >
        <PrimaryHeader user={user!} />
        <div className="flex h-full w-full">
          <DynamicSidebar renderKey="users" />
          <div className="h-full flex-grow">{children}</div>
        </div>
        <ModalBottom />
      </main>
    );
  }

  return (
    <main
      style={mainStyle}
      className="h-full w-screen gap-4 bg-background p-6"
    >
      <PrimaryHeader user={user!} />
      {children}
      <ModalBottom />
    </main>
  );
};

export default SuperAdminLayout;
