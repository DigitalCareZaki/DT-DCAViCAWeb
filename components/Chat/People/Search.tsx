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

  // Fetch users matching the search string
  const fetchOptions = useCallback(
    async (search: string) => {
      setLoading(true);
      dispatch(setFetchingRoomsReducer({ value: true }));
      const res = await searchChatRooms(search);
      if (res.success) {

        console.log('fetch options function payload', res.data);
        setOptions(res.data);
      }
      setLoading(false);
      dispatch(setFetchingRoomsReducer({ value: false }));
    },
    [dispatch]
  );

  // Debounced search handler
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
      }, 400); // 400ms debounce
    },
    [fetchOptions]
  );

  // Handle user click: open or create chat room
  const onOptionClick = async (option: any) => {
    const userId = option.users?.[0]?.id;
    const existingRoom = rooms.find((room: any) =>
      room.users.some((user: any) => user.id === userId)
    );

    if (existingRoom) {
      // Open existing room
      dispatch(setSelectedRoomReducer({ room: existingRoom }));
    } else {
      // Create new room and open it
      const userObj = option.users ? option : { users: [option] };
      console.log('userObj >>>', userObj);
      await openOrCreateRoom(dispatch, userObj);
      // Optionally, you can refetch rooms and select the new one if needed
    }
    setValue('');
    setShowOptions(false);
    setOptions([]);
  };

  // Optional: handle form submit (e.g., on Enter key)
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

  // Initial fetch (optional)
  useEffect(() => {
    // @ts-ignore
    onSubmit();
  }, []);

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} className="w-full">
        <InputBasic
          icon="IoSearch"
          placeholder="Search participants"
          borderTheme
          inputWrapperClassName="bg-background"
          inputClassName="bg-background"
          onChange={onChange}
          value={value}
          autoComplete="off"
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
