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
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 font-poppins">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold tracking-wide text-gray-500">
            My Articles
          </span>
          <IoDocumentText size={20} />
        </div>

        {/* Articles list container */}
        <div className="hidescrollbar flex h-full w-full flex-col gap-4 overflow-y-scroll">
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
