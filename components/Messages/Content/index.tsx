'use server';

import Header from './Header';
import DisplayContent from './Content';
import Toolbar from './Toolbar';

import type { ServerComponent } from '@types';

const Content: ServerComponent = async () => {
  return (
    <div className="flex h-[95%] w-[75%] flex-col justify-between gap-10 rounded-l-lg bg-white px-4 py-14 pb-2">
      <Header />
      <DisplayContent />
      <Toolbar />
    </div>
  );
};

export default Content;
