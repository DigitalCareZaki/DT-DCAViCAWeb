'use server';

import { IoHome } from '@react-icons/all-files/io5/IoHome'; // Home Icon
import { MdArrowForward } from '@react-icons/all-files/md/MdArrowForward'; // Arrow Icon

import type { Props } from './types'; // Import the type for props

export default async function Primary({ title }: Props): Promise<JSX.Element> {
  return (
    <div className="theme-bg-color master:bg-black flex items-center gap-1 rounded-2xl px-6 py-4 text-xs text-white superadmin:text-green-200 admin:text-indigo-200 patient:text-rose-200">
      {/* Home Icon with increased size for readability */}
      <IoHome size={18} className="text-white" />

      {/* "Home" text with increased readability */}
      <span className="text-xs sm:text-sm font-medium tracking-wider text-white">Home</span>

      {/* Arrow icon */}
      <MdArrowForward size={18} className="text-white" />

      {/* Dynamic title with better readability */}
      <span className="text-white text-xs sm:text-sm md:text-base font-semibold">{title}</span>
    </div>
  );
}
