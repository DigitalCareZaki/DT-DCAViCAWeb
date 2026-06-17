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
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

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
  const [value, setValue] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isSending, setIsSending] = useState<boolean>(false);
  const isSendingRef = useRef<boolean>(false);

  const { selectedRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // Hide the message bar if no chat is selected
  if (!selectedRooms?.id) {
    return <></>;
  }


  const sentMessage = async (
    file: File | undefined,
    user: UserProps,
    value: string
  ): Promise<boolean> => {
    try {
      let media: undefined | string = undefined;

      if (file) {
        const formdata = new FormData();

        formdata.append('file', file);

        const res = await uploadFile(formdata);
        if (res.success) media = res.url;
        else return false;
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
            reciever_id: selectedRooms?.users[0].id,
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
              })} sent you a chat`,
              title: 'New Chat',
            },
          })
        );
      }, 1000);

      setValue('');
      setFile(undefined);
      return true;
    } catch {
      return false;
    }
  };

  const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (isSendingRef.current || (!value.trim() && !file)) return;

    isSendingRef.current = true;
    setIsSending(true);

    try {
      await sentMessage(file, user, value.trim());
    } finally {
      isSendingRef.current = false;
      setIsSending(false);
    }
  };



  const onFileSelected = async () => {
    if (isSendingRef.current) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept all file types, you can specify if needed
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the selected file here
        setFile(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-full mt-2 mb-4">
      {file && previewUrl && (
        <div className="flex items-center gap-2 mb-2 px-2 ml-14">
          <div className="relative h-16 w-16 rounded overflow-hidden border border-gray-300">
            <Image
              src={previewUrl}
              alt="preview"
              fill
              className="object-cover"
            />
            {isSending && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Remove selected image"
            disabled={isSending}
            onClick={() => setFile(undefined)}
            className="text-red-500 transition duration-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>
      )}
      <form
        onSubmit={handleMessage}
        aria-busy={isSending}
        className="w-90 focus-within:theme-border-color flex h-14 items-center gap-4 rounded-lg border border-transparent bg-opacity-50 bg-gradient-to-br from-dark-secondary/50 to-dark-secondary/80 px-2 backdrop-blur-lg transition duration-300 focus-within:border mt-0 mb-0"
      >
        <div className="relative h-8 w-8 rounded-full">
          <Image
            src={getProfilePicture(user.uri)}
            alt="profile-picture"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="h-12 w-[80%] bg-transparent text-2xl">
          <input
            className="h-full w-full bg-transparent text-gray-main text-white/90 outline-none"
            placeholder="Type your message.."
            onChange={onChange}
            value={value}
            disabled={isSending}
            autoFocus
          />
        </div>
        <div className="flex h-10 w-[20%] items-center justify-end gap-4 text-white/80">
          <button
            type="button"
            aria-label="Attach image"
            onClick={onFileSelected}
            disabled={isSending}
            className="hover:theme-text-color cursor-pointer transition duration-300 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaImage />
          </button>
          <button
            disabled={isSending || (!value.trim() && !file)}
            className="hover:theme-text-color flex h-full w-[40%] cursor-pointer items-center justify-center border-l border-gray-main/50 outline-none transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? (
              <div
                aria-label="Sending message"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent"
              />
            ) : (
              <IoSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageBar;
