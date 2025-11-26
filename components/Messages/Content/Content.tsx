'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
// ...existing code...
import NoContentSelected from './NoContent';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@common';
import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import { clearMessageReducer } from '@slice';
import { getProfilePicture, getName } from '@init-globals';
import MessageContentSkeleton from './MessageContentSkeleton';
import Compose from '../Compose';
import { useUser } from '@selectors';

const Content: ClientComponent = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [user] = useUser();

  const { message, composeMessage, modals } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  useEffect(() => {
    dispatch(clearMessageReducer());
  }, [pathname, dispatch]);

  // Determine if we should show sender or receiver based on route and user role
  const shouldShowSender = () => {
    if (!pathname) return false;

    // For "sent" messages, always show receiver (who received the message)
    if (pathname?.includes('/sent')) {
      return false;
    }

    // If user is DOCTOR and on /doctor/messages (but not sent), show sender
    if (user?.role === 'DOCTOR' && pathname?.startsWith('/doctor/messages') && !pathname?.includes('/sent')) {
      return true;
    }
    // If user is NURSE and on /nurse/messages (but not sent), show sender
    if (user?.role === 'NURSE' && pathname?.startsWith('/nurse/messages') && !pathname?.includes('/sent')) {
      return true;
    }
    // If user is PATIENT and on /patient/messages (but not sent), show sender
    if (user?.role === 'PATIENT' && pathname?.startsWith('/patient/messages') && !pathname?.includes('/sent')) {
      return true;
    }
    // If user is ADMIN and on /admin/messages (but not sent), show sender
    if (user?.role === 'ADMIN' && pathname?.startsWith('/admin/messages') && !pathname?.includes('/sent')) {
      return true;
    }
    // If user is SUPERADMIN and on /superadmin/messages (but not sent), show sender
    if (user?.role === 'SUPERADMIN' && pathname?.startsWith('/superadmin/messages') && !pathname?.includes('/sent')) {
      return true;
    }
    // For any other route, show receiver
    return false;
  };

  const showSender = shouldShowSender();

  if (message.loading) return <MessageContentSkeleton />;

  if (!message.show) return <NoContentSelected />;

  // Ensure mainMessage is always an array
  const mainMessageArray = Array.isArray(message.data) ? message.data : [message.data];

  // Find if we are replying (parent_id set)
  const isReplying = !!composeMessage.parent_id;

  const isImage = (url: string) => /\.(png|jpe?g|gif|webp|bmp|svg|ico|tiff?|psd|raw|heic|heif|avif|jfif)$/i.test(url);

  return (
    <div className="flex h-[85%] w-full flex-col gap-6 overflow-y-auto p-6 bg-white">
      {mainMessageArray.map((item: any, i: number) =>
        item?.threadMessages?.map((msg: any, index: number) => {
          const isLast = index === item.threadMessages.length - 1;

          return (
            <div
              key={`${i}-${index}`}
              className="rounded-md border border-gray-200 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex w-full items-center justify-between border-b px-6 py-4">
                <div className="flex gap-2">
                  <div className="relative h-10 w-10 rounded-full">
                    <Image
                      src={getProfilePicture(showSender ? msg.sender?.uri : msg.reciever?.uri)}
                      alt="profile picture"
                      fill
                      className="h-full w-full rounded-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-800">
                      {getName({
                        first_name: showSender ? (msg.sender?.first_name ?? '') : (msg.reciever?.first_name ?? ''),
                        middle_name: showSender ? (msg.sender?.middle_name ?? '') : (msg.reciever?.middle_name ?? ''),
                        last_name: showSender ? (msg.sender?.last_name ?? '') : (msg.reciever?.last_name ?? ''),
                      })}
                    </span>
                    <span className="text-sm text-gray-500">
                      {showSender ? msg.sender?.email : msg.reciever?.email}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">
                    {new Date(msg.created_at).toDateString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Subject */}
              {msg.subject && (
                <div className="px-6 pt-2 text-2xl font-semibold text-gray-700">
                  {msg.subject}
                </div>
              )}

              {/* Body */}
              <div
                className="prose max-w-full px-6 pb-6 pt-2 text-2xl text-gray-800"
                dangerouslySetInnerHTML={{ __html: msg.content ?? '' }}
              />

              {/* Attachments */}
              {Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
                <div className="px-6 pb-5">
                  <div className="flex flex-wrap gap-4">
                    {msg.attachments.map((url: string, aIdx: number) => {
                      const name = url.split('/').pop() || 'attachment';
                      const ext = (name.split('.').pop() || '').toUpperCase();
                      if (isImage(url)) {
                        return (
                          <div
                            key={`${url}-${aIdx}`}
                            className="group relative h-[120px] w-[120px] overflow-hidden rounded-lg border bg-gray-50 shadow-sm"
                          >
                            <Image
                              src={url}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 hidden items-end bg-black/40 p-2 opacity-0 transition group-hover:flex group-hover:opacity-100">
                              <div className="flex w-full items-center justify-between gap-2 text-xs text-white">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="pointer-events-auto rounded bg-white/20 px-2 py-[2px] backdrop-blur hover:bg-white/30"
                                >
                                  View
                                </a>
                                <a
                                  href={url}
                                  download
                                  className="pointer-events-auto rounded bg-white/20 px-2 py-[2px] backdrop-blur hover:bg-white/30"
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={`${url}-${aIdx}`}
                          className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm"
                          title={name}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 ring-1 ring-gray-200">
                            <Icon name="IoDocumentText" size={14} />
                          </span>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="max-w-[220px] truncate hover:underline"
                          >
                            {name}
                          </a>
                          <span className="rounded bg-gray-200 px-1.5 py-[2px] text-xs text-gray-600">{ext}</span>
                          <a
                            href={url}
                            download
                            className="ml-1 rounded-full px-2 py-1 text-xs text-blue-600 hover:bg-blue-50"
                          >
                            Download
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Inline reply below last message if replying */}
              {isLast && isReplying && <div className="mt-4"><Compose inline /></div>}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Content;
