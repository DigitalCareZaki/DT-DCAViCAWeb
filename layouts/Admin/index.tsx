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

  const mainStyleSettings = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Ensures scaling starts at the top-left corner
    width: '150%', // Compensates for scaling width
    height: '150%', // Compensates for scaling height
    overflow: 'hidden', // Changed back to hidden for the main container
  };

  if (route?.includes('/admin/chat')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          <div className="px-6 pt-4 sticky top-0 z-50 bg-background">
            <PrimaryHeader user={user!} />
          </div>
          <div className="flex flex-grow h-0 w-full">
            {children}
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  if (route?.includes('/admin/settings')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyleSettings}
          className="relative gap-4 bg-background p-6"
        >
          <div className="sticky top-0 z-50 bg-background pb-4">
            <PrimaryHeader user={user!} />
          </div>
          <div className="flex h-full w-full overflow-hidden">
            <DynamicSidebar renderKey="settings" />
            <div className="flex-grow pl-4 overflow-auto min-w-0">
              {children}
            </div>
          </div>
          <ModalBottom />
        </main>
      </div>
    );
  }

  // if (route?.includes('/admin/users')) {
  //   return (
  //     <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6">
  //       <div className="sticky top-0 z-50 bg-background pb-4">
  //         <PrimaryHeader user={user!} />
  //       </div>
  //       <div className="flex h-full w-full overflow-hidden">
  //         <div className="flex-shrink-0">
  //           <DynamicSidebar renderKey="users" />
  //         </div>
  //         <div className="flex-grow overflow-auto min-w-0">{children}</div>
  //       </div>
  //       <ModalBottom />
  //     </main>
  //   );
  // }

  if (route?.includes('/admin/users')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main style={mainStyle} className="flex flex-col h-screen w-full bg-background p-6">
          <div className="sticky top-0 z-50 bg-background pb-4">
            <PrimaryHeader user={user!} />
          </div>
          <div className="flex flex-1 w-full overflow-hidden">
            <div className="flex-shrink-0">
              <DynamicSidebar renderKey="users" />
            </div>
            <div className="flex-grow overflow-auto min-w-0">{children}</div>
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
        className="relative gap-4 bg-background p-6"
      >
        <div className="sticky top-0 z-50 bg-background pb-4">
          <PrimaryHeader user={user!} />
        </div>
        {children}
        <ModalBottom />
      </main>
    </div>
  );
};

export default AdminLayout;