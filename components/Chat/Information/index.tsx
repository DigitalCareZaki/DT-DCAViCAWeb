'use server';

import Topbar from './Topbar';
import Favourite from './Favourite';
import Media from './Media';
import Search from './Search';
import Recipient from './Recipient';

import type { ServerComponent } from '@types';

const Conversation: ServerComponent = async () => {
  return (
    <div className="hidescrollbar flex h-full w-[20%] flex-col gap-8 overflow-y-scroll bg-dark-secondary p-4">
      <Topbar />
      <Recipient />
      {/* <Search /> */}
      {/* <Media /> */}
      {/* <Favourite /> */}
    </div>
  );
};

export default Conversation;