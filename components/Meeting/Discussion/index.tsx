'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingsChats } from '@service';
import {

  addToChatsReducer,

} from '@slice';
import Discussions from './Discussion';
import Form from './Form';

import type { DiscussionProps } from './types';

export default function Discussion({ id }: DiscussionProps) {
  // TODO: If you need to fetch data, use useEffect or SWR here.
  // For now, just render a placeholder with the id.
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     console.log('Fetching chats testing for meeting ID after:', id);
  //     const res = await fetchMeetingsChats(id);
  //     console.log('Fetching chats testing for meeting ID before:', res.data.chats);

  //     if (res.success) {
  //       const mappedChats = (res?.data?.chats || [])?.map((chat: any) => ({
  //         appointment_id: chat.appointment_id,
  //         created_at: chat.created_at,
  //         first_name: chat.auhor?.first_name,
  //         last_name: chat.auhor?.last_name,
  //         message: chat.message,
  //         middle_name: chat.auhor?.middle_name,
  //         user_id: chat.auhor?.id,
  //       }));
  //       dispatch(addToChatsReducer({ chat: mappedChats }));
  //       console.log('Fetched chats:', mappedChats);
  //     }
  //   };

  //   fetchChats();
  // }, [id, dispatch]);


  return (
    <div className="flex h-[28rem] w-full flex-grow-0 flex-col justify-between gap-4 rounded-xl bg-dark-secondary p-5">
      <div className="flex w-full shrink-0 flex-col">
        <span className=" font-semibold text-white">Discussion</span>
        <div className="flex items-center gap-2">
          {/* <span className="text-xs text-gray-500">Recording</span> */}
          {/* <div className="relative flex h-3 w-3 items-center justify-center rounded-full">
            <div className="theme-bg-color h-2 w-2 rounded-full" />
            <div className="theme-bg-color absolute h-2 w-2 animate-ping rounded-full" />
          </div> */}
        </div>
      </div>
      <Discussions />
      <Form id={id} />
    </div>
  );
}
