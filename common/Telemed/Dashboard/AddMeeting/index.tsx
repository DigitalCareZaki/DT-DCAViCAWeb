'use server';
import { getUser } from '@actions';
import Header from '../components/Header';
import Form from './Form';
import { BiLoaderAlt } from 'react-icons/bi';
import type { ServerComponent } from '@types';
import {
  PrimaryHeader,
} from '@common';

const AddMeeting: ServerComponent = async () => {
  const user = await getUser();
  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      {user ? (
        <PrimaryHeader user={user as any} />
      ) : (
        <BiLoaderAlt />
      )}

      <div className="flex w-full justify-center">
        <div className="w-[70%] transform scale-90">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;