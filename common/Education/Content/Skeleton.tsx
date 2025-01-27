'use server';

import PostSkeleton from '../Post/Loading';

import type { ServerComponent } from '@types';

const Skeleton: ServerComponent = async () => {
  return (
    <div className="hidescrollbar flex h-screen w-[60%] flex-col gap-4 overflow-y-scroll pb-96">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export default Skeleton;
