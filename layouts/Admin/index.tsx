'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { setUserReducer } from '@slice';
import { PrimaryHeader, DynamicSidebar, ModalBottom } from '@common';
import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const AdminLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(setUserReducer({ user }));
  }, [dispatch, user]);

  // Shared styles for scaling (zoom-out effect)
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Ensures scaling starts at the top-left corner
    width: '150%', // Compensates for scaling width
    height: '150%', // Compensates for scaling height
    overflow: 'hidden', // Prevents overflow due to scaling
  };

  if (route?.includes('/admin/chat')) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-dark-main">
        {children}
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/admin/settings')) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6">
        <PrimaryHeader user={user!} />
        <div className="flex h-full w-full">
          <DynamicSidebar renderKey="settings" />
          <div className="h-full flex-grow pl-4">{children}</div>
        </div>
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/admin/users')) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6">
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
    <main style={mainStyle} className="h-full w-screen gap-4 bg-background p-6">
      <PrimaryHeader user={user!} />
      {children}
      <ModalBottom />
    </main>
  );
};

export default AdminLayout;
