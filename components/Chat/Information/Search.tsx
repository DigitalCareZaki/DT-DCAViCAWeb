'use server';

import { InputBasic } from '@common';

import type { ServerComponent } from '@types';

const Search: ServerComponent = async () => {
  return (
    <div className="meeting-input-field w-full">
      <InputBasic
        icon="IoSearch"
        placeholder="Search conversation"
        borderTheme
      />
    </div>
  );
};

export default Search;