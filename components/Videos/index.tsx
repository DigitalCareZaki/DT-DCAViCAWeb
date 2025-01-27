'use server';

import Header from './Home/Header';
import Table from './Home/Table';

import { getVideos } from '@service';

import type { ServerComponent } from '@types';

const Videos: ServerComponent = async () => {
  const res = await getVideos();

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={res.data} />
    </div>
  );
};

export default Videos;
