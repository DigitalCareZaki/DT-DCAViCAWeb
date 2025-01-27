'use client';

import Image from 'next/image';
import { getProfilePicture, getName } from '@init-globals';
import { useImagePicker } from '@clienthooks';

import type { ClientComponentProps } from '@types';
import type { ProfileCardProps } from './types';
import { useEffect } from 'react';

const ProfileCard: ClientComponentProps<ProfileCardProps> = ({
  uri,
  first_name,
  last_name,
  middle_name,
  speciality,
  handleFileProps,
}) => {
  const [file, handleFilePicker, selectedImage] = useImagePicker();

  useEffect(() => {
    if (!file) return;

    handleFileProps(file);
  }, [file]);

  return (
    <div className="flex h-full w-full items-center gap-4 rounded-md bg-white p-4 ">
      <div
        onClick={() => handleFilePicker()}
        className="group relative h-32 w-32 cursor-pointer rounded-full"
      >
        <div className="absolute z-[99999] h-full w-full rounded-full bg-black/50 opacity-0 transition duration-200 group-hover:opacity-100" />
        <Image
          src={getProfilePicture(selectedImage ?? uri)}
          fill
          alt="profile-picture"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex h-fit w-fit flex-col gap-[2px] text-sm">
        <span className="theme-text-color font-medium">Greetings!</span>
        <span className="font-semibold text-black">
          Dr. {getName({ first_name, last_name, middle_name })}
        </span>
        <span className="font-semibold text-gray-600">{speciality}</span>
        {/* <div className="theme-bg-color w-fit rounded-full p-1 px-2 text-[8px] font-semibold text-white">
        <span>T.O Clinic</span>
      </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
