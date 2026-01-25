'use server';

import { IoDocumentText } from '@react-icons/all-files/io5/IoDocumentText';

import { ServerGenerator } from '@common';
import { getMyArticles } from '@service';
import { getUser } from '@actions';

import Content from '../LeftBar/Content';
import CreateArticle from './CreateArticle';

import type { ServerComponent } from '@types';

const Rightbar: ServerComponent = async () => {
  const user = await getUser();
  const res = await getMyArticles();

  if (!res.success) return <></>;

  return (
    <div className="flex w-full flex-col gap-4 lg:w-[20%]">
      {/* Create Article section */}
      <CreateArticle />

      {/* Articles Section */}
      <div className="flex h-[80vh] w-full flex-col gap-4 rounded-xl bg-white p-5 shadow-sm font-poppins">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <span className="text-lg font-bold tracking-wide text-gray-700">
            My Articles
          </span>
          <IoDocumentText size={22} className="text-gray-800" />
        </div>

        {/* Articles list container */}
        <div className="hidescrollbar flex h-full w-full flex-col gap-3 overflow-y-auto">
          <ServerGenerator
            data={res.data}
            userRole={user?.role?.toLowerCase()}
            selfContent
          >
            <Content />
          </ServerGenerator>
        </div>
      </div>

    </div>
  );
};

export default Rightbar;
