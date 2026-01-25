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
    <div className="hover:theme-bg-color group flex w-full cursor-pointer items-center gap-3 rounded-xl bg-background-secondary p-2 text-gray-500 transition duration-300 hover:text-white hover:shadow-md">
      <Link
        passHref
        href={`/${userRole}/education/view/${id}`}
        className="flex flex-1 items-center gap-3 overflow-hidden"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg shadow-sm">
          {imageExtension.includes(getFileExtension(uri?.toLowerCase())) ? (
            <Image
              src={uri as string}
              alt={title as string}
              fill
              className="object-cover transition duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-lg font-bold uppercase text-gray-500 group-hover:text-white">
                {getFileExtension(uri)}
              </span>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
          <span title={title} className="truncate text-sm font-bold leading-tight">
            {title}
          </span>
          <span title={content} className="truncate text-[11px] font-medium opacity-80">
            {content}
          </span>
        </div>
      </Link>
      <div className="shrink-0">
        <DeleteArticle id={id as string} selfContent={!!selfContent} />
      </div>
    </div>

  );
};

export default Content;
