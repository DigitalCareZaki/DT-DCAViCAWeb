'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SidebarButtonProps } from './types';

export default function SidebarButton({
  name,
  icon,
  path,
  ...props
}: SidebarButtonProps): JSX.Element {
  const currentPathname = usePathname();
  const [hover, setHover] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  useEffect(() => {
    if (currentPathname === path) setSelected(true);

    return () => {
      setSelected(false);
    };
  }, [currentPathname, path]);

  return (
    <Link passHref href={path || '/'}>
      <div
        {...props}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`w-full h-12 flex px-10 gap-4 items-center ${
          hover || selected ? 'bg-primary' : 'bg-transparent'
        } hover:bg-primary cursor-pointer transition duration-200`}
      >
        <div className="w-8 h-8 relative">
          <Image
            src={icon}
            alt="dashboard-icon"
            className={`w-full h-full object-contain ${
              (hover || selected) && 'svg-white'
            }`}
            fill
          />
        </div>
        <span
          className={`font-medium text-sx mb-1 transition duration-150 ${
            hover || selected ? 'text-white' : 'text-secondary'
          }`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}
