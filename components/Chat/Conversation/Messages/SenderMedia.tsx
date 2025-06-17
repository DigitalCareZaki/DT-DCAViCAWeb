'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import type { SenderMediaProps } from './types';

const SenderMedia: ClientComponentProps<SenderMediaProps> = ({
  src,
  sendedAt,
}) => {
  return (
    <div className="flex w-full shrink-0 items-start gap-4">
      <div className="relative h-8 w-8 rounded-full">
        <Image
          src="https://media.istockphoto.com/id/1278310042/video/video-portrait-of-man-looking-directly-into-camera-simulating-video-call.jpg?s=640x640&k=20&c=JoM4lAP1AfDtPiJbc2HNgAxpHGARvrbJSiMYT1-VyUc="
          className="rounded-full object-cover"
          fill
          alt="profile-picture"
        />
      </div>
      <div className="relative h-60 w-60 rounded-xl">
        <Image src={src} alt="media" className="rounded-xl object-cover" fill />
      </div>
    </div>
  );
};

export default SenderMedia;