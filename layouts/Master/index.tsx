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
    overflow: 'hidden', // Prevents overflow from scaling artifacts
  };

  if (route?.includes('/admin/users')) {
    return (
      <main
        style={mainStyle}
        className="relative h-full w-screen gap-4 bg-background p-6"
      >
        {/* <PrimaryHeader user={user!} /> */}
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

export default MasterLayout;
