'use client';
import { type ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InputBasic } from '@common';
import { searchArticle } from '@service';
import { setArticlesReducer, setIsSearchingReducer, setTrendingSearchArticlesReducer } from '@slice';

import type { ClientComponent } from '@types';

const Search: ClientComponent = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (value.trim() === '') {
        dispatch(setIsSearchingReducer(false));
        return;
      }

      try {
        setLoading(true);
        dispatch(setIsSearchingReducer(true));

        const data = await searchArticle(value);

        if (data.success) {
          dispatch(setTrendingSearchArticlesReducer({ articles: data?.data ?? [] }));
        }
      } catch (err) {
        console.log(err);
        console.log('error at search');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, dispatch]);

  return (
    <div className="education-search-field flex h-14 w-full items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
      <InputBasic
        placeholder="Search"
        icon="IoSearch"
        className="bg-gray-100"
        value={value}
        secondaryIcon="PiKeyReturnFill"
        onChange={handleChange}
        loading={loading}
      />
    </div>
  );
};

export default Search;
