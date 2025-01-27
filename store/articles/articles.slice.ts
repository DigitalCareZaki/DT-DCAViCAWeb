import { createSlice } from '@reduxjs/toolkit';

import initialState from './articles.init';
import { setArticles, pushInArticles } from './articles.reducer';

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles,
    pushInArticles,
  },
});

export const {
  setArticles: setArticlesReducer,
  pushInArticles: pushInArticlesReducer,
} = articleSlice.actions;

export default articleSlice.reducer;
