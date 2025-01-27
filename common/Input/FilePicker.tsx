'use client';

import Image from 'next/image';

import { imageExtension } from '@constants';
import { getFileExtension } from '@init-globals';

import ImagePicker from '../../assets/images/image-picker.png';
import FilePickerPlaceholder from '../../assets/images/document-picker.png';

import type { ClientComponentProps } from '@types';
import type { FilePickerProps } from './types';
import { useRef } from 'react';

const FilePicker: ClientComponentProps<FilePickerProps> = ({
  src,
  type = 'image',
  accept = '*',
  handleFileChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const Placeholder = {
    image: ImagePicker,
    file: FilePickerPlaceholder,
  };

  const handleFileOpen = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      onClick={handleFileOpen}
      className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-background p-4 transition duration-300"
    >
      {src === undefined ? (
        <Image
          alt="Image Picker"
          className="rounded-full object-cover transition-all duration-300 group-hover:scale-[110%]"
          src={Placeholder[type as keyof typeof Placeholder]}
          width={50}
          height={50}
          quality={100}
        />
      ) : imageExtension.includes(type?.split('/').at(-1) ?? '') ? (
        <Image
          alt="Image Picker"
          className="rounded-full object-cover transition-all duration-300 group-hover:scale-[110%]"
          src={src ?? Placeholder[type as keyof typeof Placeholder]}
          width={50}
          height={50}
          quality={100}
        />
      ) : (
        <div className="theme-text-color flex h-full w-full items-center justify-center rounded-full font-bold uppercase">
          {type?.split('/').at(-1)}
        </div>
      )}

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilePicker;
