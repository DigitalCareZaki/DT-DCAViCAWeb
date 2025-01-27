'use client';

import { twMerge } from 'tailwind-merge';

import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { FaRegUser } from '@react-icons/all-files/fa/FaRegUser';
import { FaEyeSlash } from '@react-icons/all-files/fa/FaEyeSlash';
import { FaLock } from '@react-icons/all-files/fa/FaLock';
import { FaPercentage } from '@react-icons/all-files/fa/FaPercentage';
import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { FaCalendarAlt } from '@react-icons/all-files/fa/FaCalendarAlt';
import { FaGenderless } from '@react-icons/all-files/fa/FaGenderless';
import { FaBold } from '@react-icons/all-files/fa/FaBold';
import { FaItalic } from '@react-icons/all-files/fa/FaItalic';
import { FaUnderline } from '@react-icons/all-files/fa/FaUnderline';
import { FaCode } from '@react-icons/all-files/fa/FaCode';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import { FaLocationArrow as FaLocationDot } from '@react-icons/all-files/fa/FaLocationArrow';
import { FaPhone as FaSquarePhone } from '@react-icons/all-files/fa/FaPhone';
import { FaUserAstronaut as FaUserDoctor } from '@react-icons/all-files/fa/FaUserAstronaut';
import { FaFingerprint as PiPasswordFill } from '@react-icons/all-files/fa/FaFingerprint';
import { FaHeading as LuHeading1 } from '@react-icons/all-files/fa/FaHeading';
import { FaHeading as LuHeading2 } from '@react-icons/all-files/fa/FaHeading';

import { IoLogoGooglePlaystore as BiLogoPlayStore } from '@react-icons/all-files/io5/IoLogoGooglePlaystore';
import { BiMessageSquare as BiSolidMessageSquareEdit } from '@react-icons/all-files/bi/BiMessageSquare';
import { BiRuler as TbRulerMeasure } from '@react-icons/all-files/bi/BiRuler';

import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { IoTimerSharp } from '@react-icons/all-files/io5/IoTimerSharp';
import { IoDocumentText } from '@react-icons/all-files/io5/IoDocumentText';
import { IoSend } from '@react-icons/all-files/io5/IoSend';
import { IoClose } from '@react-icons/all-files/io5/IoClose';

import { MdMergeType } from '@react-icons/all-files/md/MdMergeType';
import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import { MdPinDrop as MdPin } from '@react-icons/all-files/md/MdPinDrop';
import { MdTitle } from '@react-icons/all-files/md/MdTitle';
import { MdKeyboardReturn as MdOutlineKeyboardReturn } from '@react-icons/all-files/md/MdKeyboardReturn';
import { MdKeyboardReturn as PiKeyReturnFill } from '@react-icons/all-files/md/MdKeyboardReturn';

import { FaWaveSquare as SiNamecheap } from '@react-icons/all-files/fa/FaWaveSquare';
import { VscReferences } from '@react-icons/all-files/vsc/VscReferences';

import { RiNurseFill } from '@react-icons/all-files/ri/RiNurseFill';
import { RiNumbersFill as PiNumberSquareOneFill } from '@react-icons/all-files/ri/RiNumbersFill';
import { RiNumbersFill as PiNumberSquareTwoFill } from '@react-icons/all-files/ri/RiNumbersFill';

import type { Props } from './types';

export default function Icon({
  name,
  size,
  style,
  onClick,
  color,
  className,
}: Props): JSX.Element {
  const props = {
    size,
    className: 'text-gray-500',
    style,
    onClick,
    color,
  };

  if (name === 'FaRegUser')
    return (
      <FaRegUser {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaLock')
    return (
      <FaLock {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaEye')
    return <FaEye {...props} className={twMerge('text-gray-500', className)} />;
  if (name === 'FaEyeSlash')
    return (
      <FaEyeSlash {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaApple')
    return (
      <FaApple {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'BiLogoPlayStore')
    return (
      <BiLogoPlayStore
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'IoIosArrowForward')
    return (
      <IoIosArrowForward
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'MdPin')
    return <MdPin {...props} className={twMerge('text-gray-500', className)} />;
  if (name === 'IoSearch')
    return (
      <IoSearch {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'IoMdAdd')
    return (
      <IoMdAdd {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaPercentage')
    return (
      <FaPercentage
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'IoTimerSharp')
    return (
      <IoTimerSharp
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'FaImage')
    return (
      <FaImage {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'IoSend')
    return (
      <IoSend {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaUser')
    return (
      <FaUser {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'MdMergeType')
    return (
      <MdMergeType {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaCalendarAlt')
    return (
      <FaCalendarAlt
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'IoDocumentText')
    return (
      <IoDocumentText
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'SiNamecheap')
    return (
      <SiNamecheap {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'BiSolidMessageSquareEdit')
    return (
      <BiSolidMessageSquareEdit
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'MdEmail')
    return (
      <MdEmail {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'PiPasswordFill')
    return (
      <PiPasswordFill
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'FaSquarePhone')
    return (
      <FaSquarePhone
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'FaGenderless')
    return (
      <FaGenderless
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'MdTitle')
    return (
      <MdTitle {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaLocationDot')
    return (
      <FaLocationDot
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'TbRulerMeasure')
    return (
      <TbRulerMeasure
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'FaUserDoctor')
    return (
      <FaUserDoctor
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'RiNurseFill')
    return (
      <RiNurseFill {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'VscReferences')
    return (
      <VscReferences
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'PiKeyReturnFill')
    return (
      <PiKeyReturnFill
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'MdOutlineKeyboardReturn')
    return (
      <MdOutlineKeyboardReturn
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'FaBold')
    return (
      <FaBold {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaItalic')
    return (
      <FaItalic {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaUnderline')
    return (
      <FaUnderline {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaCode')
    return (
      <FaCode {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'TbSquareNumber1Filled')
    return (
      <PiNumberSquareOneFill
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'TbSquareNumber2Filled')
    return (
      <PiNumberSquareTwoFill
        {...props}
        className={twMerge('text-gray-500', className)}
      />
    );
  if (name === 'LuHeading1')
    return (
      <LuHeading1 {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'LuHeading2')
    return (
      <LuHeading2 {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'FaLink')
    return (
      <FaLink {...props} className={twMerge('text-gray-500', className)} />
    );
  if (name === 'IoClose')
    return (
      <IoClose {...props} className={twMerge('text-gray-500', className)} />
    );

  return <></>;
}
