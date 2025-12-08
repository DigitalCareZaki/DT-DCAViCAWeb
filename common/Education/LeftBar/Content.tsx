'use client';

import Image from 'next/image';
import Link from 'next/link';

import { getFileExtension } from '@init-globals';
import { imageExtension } from '@constants';

import DeleteArticle from './DeleteArticle';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const Content: ClientComponentProps<Props> = ({
  uri,
  title,
  content,
  userRole,
  id,
  selfContent,
}) => {
  return (
    <div className="hover:theme-bg-color flex w-full cursor-pointer items-center gap-2 rounded-lg bg-background-secondary px-2 py-2 text-gray-500 transition duration-200 hover:text-white">
      <Link
        passHref
        href={`/${userRole}/education/view/${id}`}
        className="flex w-full items-center gap-2"
      >
        <div className="relative h-16 w-16 shrink-0 rounded-lg">
          {imageExtension.includes(getFileExtension(uri?.toLowerCase())) ? (
            <Image
              src={uri as string}
              alt={title as string}
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
              <span className="text-2xl font-semibold uppercase ">
                {getFileExtension(uri)}
              </span>
            </div>
          )}
        </div>
        <div className="flex h-full flex-col py-2 text-sm font-medium">
          <span title={title} className="text-base font-bold">
            {title}
          </span>
          <span title={content} className="text-xs font-medium">
            {content?.slice(0, 28) + '..'}
          </span>
        </div>
      </Link>
      <DeleteArticle id={id as string} selfContent={!!selfContent} />
    </div>
  );
};

export default Content;
