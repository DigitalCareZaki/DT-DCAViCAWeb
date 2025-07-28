'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

import { setUserReducer } from '@slice';

import { PrimaryHeader, DynamicSidebar, ModalBottom } from '@common';

import type { ClientComponentProps, ChildrenComponentProps } from '@types';

const MasterLayout: ClientComponentProps<ChildrenComponentProps> = ({
  user,
  children,
}) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(setUserReducer({ user }));
  }, [dispatch, user]);

  // Shared styles for scaling
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Keeps scaling origin at the top-left corner
    width: '150%', // Compensates for the width scaling
    height: '150%', // Compensates for the height scaling
  };

  if (route?.includes('/admin/users')) {
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

export default MasterLayout;
