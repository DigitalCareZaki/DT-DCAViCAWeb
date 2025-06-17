'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { setFetchingRoomsReducer, setRoomsReducer } from '@slice';
import { InputBasic } from '@common';
import { searchChatRooms } from '@service';

import type { ClientComponent } from '@types';

const Search: ClientComponent = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      dispatch(setFetchingRoomsReducer({ value: true }));
      const res = await searchChatRooms(value);

      if (res.success) {
        dispatch(setRoomsReducer({ rooms: res.data }));
      }

      setValue('');
    } catch (err) {
    } finally {
      dispatch(setFetchingRoomsReducer({ value: false }));
    }
  };

  useEffect(() => {
    // @ts-ignore
    onSubmit();
  }, []);

  return (
    <form onSubmit={onSubmit} className="meeting-input-field w-full">
      <InputBasic
        icon="IoSearch"
        placeholder="Search participants"
        borderTheme
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default Search;