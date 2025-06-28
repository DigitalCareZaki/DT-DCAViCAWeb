'use server';

import { getArticles } from '@service';

import Content from './Content/Content';
import Form from './Form';
import Leftbar from './LeftBar';
import Rightbar from './Rightbar';

import type { ServerComponent } from '@types';

const Education: ServerComponent = async () => {
  const res = await getArticles();

  console.log('res articles>>>>', res);

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 pt-6">
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        {/* Leftbar takes a small portion on large screens */}
        <div className="flex w-full lg:w-1/4">
          <Leftbar />
        </div>
        {/* Main content takes most of the space */}
        <div className="flex w-full lg:w-2/3">
          <Content data={res.data} />
        </div>
        {/* Rightbar has a smaller width on large screens */}
        <div className="flex w-full lg:w-1/4">
          <Rightbar />
        </div>
      </div>
      {/* Form stays at the bottom */}
      <Form />
    </div>
  );
};

export default Education;
