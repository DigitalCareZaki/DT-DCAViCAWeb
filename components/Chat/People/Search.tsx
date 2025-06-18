'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { setFetchingRoomsReducer, setRoomsReducer } from '@slice';
import { InputBasic } from '@common';
import { searchChatRooms } from '@service';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOptions = useCallback(
    async (search: string) => {
      dispatch(setFetchingRoomsReducer({ value: true }));
      const res = await searchChatRooms(search);
      if (res.success) {
        setOptions(res.data);
      }
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
      debounceRef.current = setTimeout(() => {
        if (val) fetchOptions(val);
      }, 300);
    },
    [fetchOptions]
  );

  const onOptionClick = (option: any) => {
    dispatch(setRoomsReducer({ rooms: [option] }));
    setValue('');
    setShowOptions(false);
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
        />
      </form>
      {showOptions && options.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <li
              key={option.users?.[0]?.id || idx}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
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