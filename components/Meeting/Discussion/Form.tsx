'use client';

import { ChangeEvent, useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { InputBasic } from '@common';
import { useUser } from '@selectors';
import { handleEventReducer } from '@slice';
import { uploadFile } from '@service';

import type { ClientComponentProps } from '@types';
import type { DiscussionProps } from './types';

const Form: ClientComponentProps<DiscussionProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const [file, setFile] = useState<File | undefined>(undefined);

  const [value, setValue] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fileUrl: undefined | string = undefined;

    if (!value?.trim()?.length) return;

    if (file) {
      const formdata = new FormData();

      formdata.append('file', file);

      const res = await uploadFile(formdata);
      if (res.success) fileUrl = res.url;
    }

    dispatch(
      handleEventReducer({
        event: 'meeting-chat',
        payload: {
          message: value,
          user_id: user.id,
          appointment_id: id,
          first_name: user.first_name,
          last_name: user.last_name,
          middle_name: user.middle_name,
          created_at: new Date(),
          media: fileUrl,
        },
      })
    );
    setValue('');
    setFile(undefined);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFileSelected = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept all file types, you can specify if needed
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the selected file here
        console.log('Selected file:', file.name);
        setFile(file);
        // You can add further processing or state updates here
      }
    };
    input.click();
  };

  return (
    <form onSubmit={onSubmit} className="meeting-input-field w-full">
      <InputBasic
        icon="FaImage"
        placeholder="Search participants"
        borderTheme
        secondaryIcon="IoSend"
        onChange={onChange}
        value={value}
        primaryIconClassName="text-gray-400 hover:text-blue-500 cursor-pointer"
        secondaryIconClassName="text-gray-400"
        primaryOnClick={onFileSelected}
      />
    </form>
  );
};

export default Form;
