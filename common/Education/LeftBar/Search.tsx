'use client';

import { FormEvent, type ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { InputBasic } from '@common';
import { searchArticle } from '@service';
import { setArticlesReducer } from '@slice';

import type { ClientComponent } from '@types';

const Search: ClientComponent = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await searchArticle(value);
      console.log('Serach data <<<', data);

      if (!data.success) return setLoading(false);

      dispatch(setArticlesReducer({ articles: data?.data ?? [] }));
    } catch (err) {
      console.log(err);
      console.log('error at search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="education-search-field flex h-14 w-full items-center justify-center rounded-lg border border-gray-100 bg-white p-2"
    >
      <InputBasic
        placeholder="Search"
        icon="IoSearch"
        className="bg-gray-100"
        value={value}
        secondaryIcon="PiKeyReturnFill"
        onChange={handleChange}
        loading={loading}
      />
    </form>
  );
};

export default Search;
