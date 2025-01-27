import { Suspense } from 'react';

import {
  MessageToolbar,
  MessageSidebar,
  MessageContent,
  MessageSidebarFallback,
  MessageToolbarFallback,
  MessageContentFallback,
  MessageComposeModal,
} from '@components';

import type { PageProps } from '@types';

export default function Page(props: PageProps): JSX.Element {
  return (
    <main className="relative flex h-full w-full p-2">
      <Suspense fallback={<MessageToolbarFallback />}>
        <MessageToolbar />
      </Suspense>

      <Suspense fallback={<MessageSidebarFallback />}>
        <MessageSidebar
          search={props.searchParams?.search?.toString()}
          type="starred"
        />
      </Suspense>

      <Suspense fallback={<MessageContentFallback />}>
        <MessageContent />
      </Suspense>
      <MessageComposeModal />
    </main>
  );
}
