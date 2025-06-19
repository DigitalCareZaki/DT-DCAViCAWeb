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
    overflow: 'hidden', // Prevents overflow from scaling artifacts
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
          <div className="px-6 pt-4">
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


  // old code 
  // if (
  //   route?.includes('/nurse/telemed/appointment') ||
  //   route?.includes('/nurse/chat')
  // ) {
  //   return (
  //     <main
  //       style={mainStyle}
  //       className="relative h-full w-screen gap-4 bg-dark-main"
  //     >
  //       {children}
  //       <ModalBottom />
  //     </main>
  //   );
  // }

  if (route?.includes('/nurse/telemed')) {
    return (
      <main
        style={mainStyle}
        className="relative h-full w-screen gap-4 bg-background p-6"
      >
        <div className="flex h-full w-full">
          <TelemedSidebar userType={user?.type} />
          <div className="h-full flex-grow">{children}</div>
        </div>
        <ModalBottom />
      </main>
    );
  }

  if (route?.includes('/nurse/patient')) {
    return (
      <main
        style={mainStyle}
        className="h-full w-screen gap-4 bg-background p-6"
      >
        <PrimaryHeader user={user!} />
        <div className="flex h-full w-full">
          <PatientSidebar />
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

export default NurseLayout;
