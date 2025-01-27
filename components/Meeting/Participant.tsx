'use client';

import Image from 'next/image';
import { FaHandPaper } from '@react-icons/all-files/fa/FaHandPaper';
import { MdCameraAlt } from '@react-icons/all-files/md/MdCameraAlt';
import { FaMicrophone } from '@react-icons/all-files/fa/FaMicrophone';

import { useUser } from '@selectors';
import { getName, getProfilePicture } from '@init-globals';

import type { ClientComponentProps } from '@types';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const Participant: ClientComponentProps<any> = ({
  user_id,
  uri,
  role,
  first_name,
  last_name,
  middle_name,
  hand,
  microphone,
  camera,
}) => {
  const [currentUser] = useUser();

  const me = useMemo(() => {
    if (user_id === currentUser.id) return true;

    return false;
  }, [user_id, currentUser]);

  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-11 w-11 rounded-md bg-white">
          <Image
            src={getProfilePicture(uri)}
            alt="profile-picture"
            className={twMerge('rounded-md object-cover')}
            fill
          />
        </div>
        <div className="flex flex-col gap-2 text-xs text-white">
          <span>{getName({ first_name, last_name, middle_name })}</span>
          <span className="text-ssx text-gray-400">
            {role !== undefined ? role[0] : ''}
            {role?.slice(1, role?.length).toLowerCase()} {me && '(You)'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <div
          className={twMerge(
            'meeting-bar-btn text-white',
            microphone && 'theme-bg-color'
          )}
        >
          <FaMicrophone size={16} />
        </div>
        <div
          className={twMerge(
            'meeting-bar-btn text-white',
            camera && 'theme-bg-color'
          )}
        >
          <MdCameraAlt size={16} />
        </div>
        {hand && <FaHandPaper size={22} className="text-yellow-500" />}
      </div>
    </div>
  );
};

export default Participant;
