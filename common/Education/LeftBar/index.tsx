'use server';

import { AiOutlineRise } from '@react-icons/all-files/ai/AiOutlineRise';

import { ServerGenerator } from '@common';
import { getTrendingArticles } from '@service';
import { getUser } from '@actions';

import Content from './Content';
import Search from './Search';

import type { ServerComponent } from '@types';

const Leftbar: ServerComponent = async () => {
  const user = await getUser();
  const data = await getTrendingArticles();

  if (!data.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-4 font-poppins sm:w-[30%] lg:w-[20%]">
      <Search />
      <div className="hidescrollbar flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-gray-100 bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold tracking-wide text-gray-500">
            Trending Now
          </span>
          <AiOutlineRise />
        </div>
        <ServerGenerator data={data.data} userRole={user?.role?.toLowerCase()}>
          <Content />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default Leftbar;
