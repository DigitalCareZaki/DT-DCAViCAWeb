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
    zoom: 0.67, // Natively scales the layout, avoiding bounds overlapping and double-scrollbars
  } as React.CSSProperties;

  const mainStyleSettings = {
    zoom: 0.67, // Natively scales the layout, avoiding bounds overlapping
  } as React.CSSProperties;

  const usersMainStyle = {
    transform: 'scale(0.67)',
    transformOrigin: 'top left',
    width: '150%',
    height: '150%',
  } as React.CSSProperties;

  if (route?.includes('/admin/chat')) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={mainStyle}
          className="flex flex-col h-full w-full bg-background"
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
          className="relative flex flex-col h-full w-full bg-background p-6"
        >
          <div className="sticky top-0 z-50 bg-background pb-4">
            <PrimaryHeader user={user!} />
          </div>
          <div className="flex flex-grow w-full overflow-hidden">
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
    const isUsersList = route === '/admin/users';

    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <main
          style={usersMainStyle}
          className="flex flex-col h-screen w-full bg-background"
        >
          <div className="sticky top-0 z-50 bg-background p-6 pb-2">
            <PrimaryHeader user={user!} />
          </div>
          <div
            className={`flex flex-grow h-0 w-full px-6 ${
              isUsersList ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'
            }`}
          >
            <DynamicSidebar renderKey="users" />
            <div
              className={`h-full min-w-0 flex-grow ${
                isUsersList ? 'overflow-hidden' : ''
              }`}
            >
              {children}
            </div>
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
        className="relative flex flex-col h-full w-full gap-4 p-6 overflow-y-auto overflow-x-hidden"
      >
        <div className="sticky top-0 z-50 bg-background pb-4">
          <PrimaryHeader user={user!} />
        </div>
        <div className="flex-grow">
          {children}
        </div>
        <ModalBottom />
      </main>
    </div>
  );
};

export default AdminLayout;
