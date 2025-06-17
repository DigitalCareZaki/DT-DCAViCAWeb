'use server';

import Image from 'next/image';

import { FaImage } from '@react-icons/all-files/fa/FaImage';

import type { ServerComponent } from '@types';

const Media: ServerComponent = async () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2 text-xs text-white/80">
        <FaImage size={20} className="text-white" />
        <span>Media</span>
        <span className="text-gray-main">2</span>
      </div>
      <div className="hidescrollbar flex h-full w-full flex-wrap gap-2">
        <div className="relative h-32 w-32 rounded-md">
          <Image
            src="https://images.newscientist.com/wp-content/uploads/2019/06/18153152/medicineshutterstock_1421041688.jpg"
            alt="image-src"
            className="object-cocver rounded-md"
            fill
          />
        </div>
        <div className="relative h-32 w-32 rounded-md">
          <Image
            src="https://media.istockphoto.com/id/91815962/photo/osteoporosis-of-female-hand.jpg?s=612x612&w=0&k=20&c=RqN7YAq0a7GRA_Ga0mP7064e_wmlK-mmmIwSkg-jLu4="
            alt="image-src"
            className="rounded-md object-cover"
            fill
          />
        </div>
        <div className="relative h-32 w-32 rounded-md">
          <Image
            src="https://media.istockphoto.com/id/91815962/photo/osteoporosis-of-female-hand.jpg?s=612x612&w=0&k=20&c=RqN7YAq0a7GRA_Ga0mP7064e_wmlK-mmmIwSkg-jLu4="
            alt="image-src"
            className="rounded-md object-cover"
            fill
          />
        </div>
        <div className="relative h-32 w-32 rounded-md">
          <Image
            src="https://media.istockphoto.com/id/91815962/photo/osteoporosis-of-female-hand.jpg?s=612x612&w=0&k=20&c=RqN7YAq0a7GRA_Ga0mP7064e_wmlK-mmmIwSkg-jLu4="
            alt="image-src"
            className="rounded-md object-cover"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Media;