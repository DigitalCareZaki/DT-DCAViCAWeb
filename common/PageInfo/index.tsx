'use server';

import { usePath } from '@hooks'; // Import custom hook to retrieve the current route info
import { PrimaryBreadCrumb } from '@common'; // Import the breadcrumb component

import type { ServerComponent } from '@types'; // Import the type for the ServerComponent

const PageInfo: ServerComponent = async () => {
  const route = usePath(); // Retrieve the current route object using the custom hook

  return (
    <div className="flex h-fit w-full items-center justify-between">
      <span className="text-[1.5rem] font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]">
        {route?.title}
      </span>
      <PrimaryBreadCrumb title={route?.title || ''} />
    </div>
  );
};

export default PageInfo;
