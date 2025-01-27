'use server';

import Link from 'next/link';

import { ButtonPrimary } from '@common';

import { getUser } from '@service';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  const user = await getUser();

  if (!user?.role) return <></>;

  return (
    <div className="flex w-full justify-between px-4 py-4 sm:px-6 lg:px-8">
      <span className="stext-xl screen-title font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
        Videos
      </span>
      <div className="w-40 sm:w-48">
        <Link passHref href={`/${user.role.toLocaleLowerCase()}/videos/add`}>
          <ButtonPrimary
            title="Add Video"
            name="Add video"
            className="p-4 text-lg sm:text-xl lg:text-2xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
