'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFetchingRoomsReducer, setRoomsReducer, setSelectedRoomReducer } from '@slice';
import { InputBasic } from '@common';
import { searchChatRooms } from '@service';
import { openOrCreateRoom } from './openOrCreateRoom';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const rooms = useSelector((state: any) => state.chats.rooms);

  const fetchOptions = useCallback(
    async (search: string) => {
      setLoading(true);
      dispatch(setFetchingRoomsReducer({ value: true }));
      const res = await searchChatRooms(search);
      if (res.success) {
        setOptions(res.data);
      }
      setLoading(false);
      dispatch(setFetchingRoomsReducer({ value: false }));
    },
    [dispatch]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      setShowOptions(!!val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!val) {
        setOptions([]);
        return;
      }
      debounceRef.current = setTimeout(() => {
        fetchOptions(val);
      }, 400);
    },
    [fetchOptions]
  );

  // When a user is clicked, open/create the chat room and select it
  const onOptionClick = async (option: any) => {
    // Find if a room with this user already exists
    const userId = option.users?.[0]?.id || option.id;
    const existingRoom = rooms.find((room: any) =>
      room.users.some((user: any) => user.id === userId)
    );

    if (existingRoom) {
      // Select the existing room
      dispatch(setSelectedRoomReducer({ room: existingRoom }));
    } else {
      // Create a new room
      const userObj = option.users ? option : { users: [option] };
      await openOrCreateRoom(dispatch, userObj);
    }
    setValue('');
    setShowOptions(false);
    setOptions([]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (value) {
      dispatch(setFetchingRoomsReducer({ value: true }));
      const res = await searchChatRooms(value);
      if (res.success) {
        dispatch(setRoomsReducer({ rooms: res.data }));
      }
      setValue('');
      setShowOptions(false);
      dispatch(setFetchingRoomsReducer({ value: false }));
    }
  };

  useEffect(() => {
    // @ts-ignore
    onSubmit();
  }, []);

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} className="meeting-input-field w-full">
        <InputBasic
          icon="IoSearch"
          placeholder="Search participants"
          borderTheme
          onChange={onChange}
          value={value}
          autoComplete="off"
          inputWrapperClassName="bg-background"
          inputClassName="bg-background"
        />
      </form>
      {showOptions && options.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
          {loading && (
            <li className="px-4 py-2 text-gray-400">Loading...</li>
          )}
          {options.map((option, idx) => (
            <li
              key={option.users?.[0]?.id || idx}
              className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => onOptionClick(option)}
            >
              {option.users?.[0]?.first_name} {option.users?.[0]?.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
