'use server';

import { AnalyticsTab } from '@common';
import { getPatientAppointments, getUser } from '@service';
import type { ServerComponentProps } from '@types';
import type { Props } from './types';
import { PrimaryHeader, ServerGenerator } from '@common';
import { BiLoaderAlt } from 'react-icons/bi';

const AnalyticsWrapper: ServerComponentProps<any> = async () => {


  return (
    <div >
      {/* {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )} */}
      <AnalyticsTab />
    </div>
  );
};

export default AnalyticsWrapper;
