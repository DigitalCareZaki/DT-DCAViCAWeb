'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { FaImage } from '@react-icons/all-files/fa/FaImage';
import { IoSend } from '@react-icons/all-files/io5/IoSend';

import { useUser } from '@selectors';
import { handleEventReducer } from '@slice';
import { uploadFile } from '@service';
import { getName, getProfilePicture } from '@init-globals';

import type { ClientComponent, UserProps } from '@types';
import type { ReduxProps, StoreChatState } from '@store-types';

const MessageBar: ClientComponent = () => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const [file, setFile] = useState<File | undefined>(undefined);

  const { selectedRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  const [value, setValue] = useState<string>('');

  const sentMessage = async (
    file: File | undefined,
    user: UserProps,
    value: string
  ) => {
    try {
      let media: undefined | string = undefined;

      if (file) {
        const formdata = new FormData();

        formdata.append('file', file);

        const res = await uploadFile(formdata);
        if (res.success) media = res.url;
      }

      dispatch(
        handleEventReducer({
          event: 'message',
          payload: {
            message: value,
            created_at: new Date().getTime(),
            author_id: user.id,
            author: {
              first_name: user.first_name,
              last_name: user.last_name,
              middle_name: user.middle_name,
              uri: user.uri,
              id: user.id,
              role: user.role,
            },
            room_id: selectedRooms?.id,
            media,
          },
        })
      );

      setTimeout(() => {
        dispatch(
          handleEventReducer({
            event: 'send_notification',
            payload: {
              sender_id: user.id,
              reciever_id: selectedRooms?.users[0].id,
              message: `${getName({
                first_name: user.first_name ?? '',
                last_name: user.last_name ?? '',
                middle_name: user.middle_name,
              })} sended you a chat`,
              title: 'New Chat',
            },
          })
        );
      }, 1000);

      setValue('');
      setFile(undefined);
    } catch {}
  };

  const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
    console.log('submitting form');
    e?.preventDefault();

    if (!value) return;

    await sentMessage(file, user, value);
  };

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onFileSelected = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept all file types, you can specify if needed
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the selected file here
        console.log('Selected file:', file.name);
        setFile(file);
        sentMessage(file, user, '')
          .then((res) => {})
          .catch(() => {});
        // You can add further processing or state updates here
      }
    };
    input.click();
  };

  return (
    <form
      onSubmit={handleMessage}
      className="w-90 focus-within:theme-border-color absolute bottom-2 left-5 right-5 flex h-12 items-center gap-4 rounded-lg  border border-transparent bg-opacity-50 bg-gradient-to-br from-dark-secondary/50 to-dark-secondary/80 px-2 backdrop-blur-lg transition duration-300 focus-within:border"
    >
      <div className="relative h-8 w-8 rounded-full">
        <Image
          src={getProfilePicture(user.uri)}
          alt="profile-picture"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="h-10 w-[80%] bg-transparent text-xs">
        <input
          className="h-full w-full bg-transparent text-gray-main text-white/80 outline-none"
          placeholder="Type your message.."
          onChange={onChange}
          value={value}
          autoFocus
        />
      </div>
      <div className="flex h-10 w-[20%] items-center justify-end gap-4 text-white/80">
        <FaImage
          onClick={onFileSelected}
          className="hover:theme-text-color cursor-pointer transition duration-300 hover:text-blue-500"
        />
        <button className="hover:theme-text-color flex h-full w-[40%] cursor-pointer items-center justify-center border-l border-gray-main/50 outline-none transition duration-300">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default MessageBar;
