'use server';

import Image from 'next/image';

import { getArticleDetails } from '@service';
import { getFileExtension, getName } from '@init-globals';
import { imageExtension } from '@constants';

import Author from '../Post/Author';
import Actions from '../Post/Actions';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';
import { BsFileText } from '@react-icons/all-files/bs/BsFileText';
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';

const EducationDetail: ServerComponentProps<Props> = async ({ id }) => {
  const res = await getArticleDetails(id);

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col items-center py-6">
      <div className="h-[95%] w-[70%] rounded-3xl bg-white p-4">
        <div className="flex h-fit w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-6 font-poppins">
          <Author
            name={getName(res.data.author)}
            specialty=""
            uri={res.data?.author?.uri}
          />
          <div className="relative h-96 w-full rounded-lg">
            {imageExtension.includes(getFileExtension(res.data.uri)) ? (
              <Image
                src={res.data.uri}
                alt="article-image"
                className="rounded-lg object-cover"
                fill
              />
            ) : (
              <div className="theme-bg-color flex h-full w-full flex-col items-center justify-center rounded-lg">
                <BsFileText size={50} className="text-white" />
                <span className="text-xs font-bold uppercase text-white">
                  {getFileExtension(res.data.uri)}
                </span>
              </div>
            )}
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-ssx text-gray-500">Few minutes ago</span>
            <div className="flex items-center gap-2">
              <span className="text-ssx font-bold text-gray-500">
                {res.data.views_count}
              </span>
              <AiFillEye className="text-gray-400" />
            </div>
          </div>
          <span className="mt-10 text-md font-semibold text-gray-600">
            {res.data.title}
          </span>
          <span className="text-xs">{res.data.content}</span>
          <div className="mt-10 flex flex-col gap-1 ">
            <span className="text-xs font-semibold text-gray-600">
              Refrences
            </span>
            <div className="flex items-center gap-2">
              <span className="hover:theme-text-color cursor-pointer text-xs font-bold text-gray-400">
                Gardp
              </span>
              <span className="hover:theme-text-color cursor-pointer text-xs font-bold text-gray-400">
                Google
              </span>
              <span className="hover:theme-text-color cursor-pointer text-xs font-bold text-gray-400">
                Being
              </span>
            </div>
          </div>

          <Actions
            likes={res.data.likes_count}
            comments={res.data.comments_count}
            id={res.data.id}
            file={getFileExtension(res.data.uri)}
            uri={res.data.uri}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationDetail;
