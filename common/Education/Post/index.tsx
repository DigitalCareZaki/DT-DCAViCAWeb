'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';
import { BsFileText } from '@react-icons/all-files/bs/BsFileText';

import { getName } from '@init-globals';
import { useIntersectView } from '@clienthooks';
import { viewArticlePost } from '@service';
import { imageExtension } from '@constants';
import { getFileExtension } from '@init-globals';

import Actions from './Actions';
import Author from './Author';

import type { ClientComponentProps, ArticleProps } from '@types';

const Post: ClientComponentProps<ArticleProps> = ({ ...data }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [viewed] = useIntersectView(ref);

  useEffect(() => {
    if (viewed && data?.id) {
      viewArticlePost(data.id)
        .then(() => { })
        .catch(() => { });
    }
  }, [data?.id, viewed]);

  return (
    <div
      ref={ref}
      className="flex h-fit w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-6 font-poppins"
    >
      <Author
        name={getName(data?.author)}
        specialty={data?.author?.doctor?.specialities[0]?.title}
        uri={data?.author?.uri}
      />
      <div className="relative h-96 w-full rounded-lg">
        {imageExtension.includes(getFileExtension(data?.uri)) ? (
          <Image
            src={data?.uri}
            alt="article-image"
            className="rounded-lg object-contain"
            fill
          />
        ) : (
          <div className="theme-bg-color flex h-full w-full flex-col items-center justify-center rounded-lg">
            <BsFileText size={50} className="text-white" />
            <span className="text-xs font-bold uppercase text-white">
              {getFileExtension(data?.uri)}
            </span>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-ssx text-gray-500">Few minutes ago</span>
        <div className="flex items-center gap-2">
          <span className="text-ssx font-bold text-gray-500">
            {data?.views_count}
          </span>
          <AiFillEye className="text-gray-400" />
        </div>
      </div>
      <span className="mt-10 text-md font-semibold text-gray-600">
        {data?.title}
      </span>
      <span className="text-xs">{data?.content}</span>
      <div className="mt-10 flex flex-col gap-1 ">
        <span className="text-xs font-semibold text-gray-600">Refrences</span>
        {Array.isArray(data?.refrence) && data?.refrence?.map((el, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="hover:theme-text-color cursor-pointer text-xs font-bold text-gray-400">
              {el}
            </span>
          </div>
        ))

        }
      </div>

      <Actions
        likes={data.likes_count}
        comments={data.comments_count}
        id={data.id}
        file={getFileExtension(data.uri)}
        uri={data.uri}
      />
    </div>
  );
};

export default Post;
