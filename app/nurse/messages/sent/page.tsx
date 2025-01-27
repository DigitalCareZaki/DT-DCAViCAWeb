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

export default function Page(): JSX.Element {
  return (
    <main className="relative flex h-full w-full p-2">
      <Suspense fallback={<MessageToolbarFallback />}>
        <MessageToolbar />
      </Suspense>

      <Suspense fallback={<MessageSidebarFallback />}>
        <MessageSidebar type="sent" />
      </Suspense>

      <Suspense fallback={<MessageContentFallback />}>
        <MessageContent />
      </Suspense>
      <MessageComposeModal />
    </main>
  );
}
