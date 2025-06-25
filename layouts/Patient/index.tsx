'use client';

import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { PrimaryHeader, ModalBottom, TelemedSidebar } from '@common';
import { setUserReducer } from '@slice';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const PatientLayout: ClientComponentProps<Props> = ({ user, children }) => {
  const route = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserReducer({ user }));
    }
  }, [dispatch, user]);

  // Styles for replicating a zoom-out effect
  const mainStyle = {
    transform: 'scale(0.67)', // Scale to 67%
    transformOrigin: 'top left', // Set origin to top-left to mimic zoom-out behavior
    width: '150%', // Compensate for the reduced width due to scaling
    height: '150%', // Compensate for the reduced height due to scaling
    overflow: 'hidden', // Ensure no overflow issues
  };

  if (
    route?.includes('/patient/telemed/appointment') ||
    route?.includes('/patient/chat')
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
  //   route?.includes('/patient/telemed/appointment') ||
  //   route?.includes('/patient/chat')
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

  if (route?.includes('/patient/telemed')) {
    return (
      <main style={mainStyle} className="relative h-full w-screen gap-4 bg-background p-6 overflow-y-scroll">
        <div className="flex h-full w-full">
          <TelemedSidebar userType={user?.type} />
          <div className="h-full w-[95%]">{children}</div>
        </div>
        <ModalBottom />
      </main>



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

export default PatientLayout;
