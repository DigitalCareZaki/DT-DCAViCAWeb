import { createSlice } from '@reduxjs/toolkit';

import initialState from './articles.init';
import { setArticles, pushInArticles, setIsSearching, setTrendingSearchArticles } from './articles.reducer';

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles,
    pushInArticles,
    setIsSearching,
    setTrendingSearchArticles,
  },
});

export const {
  setArticles: setArticlesReducer,
  pushInArticles: pushInArticlesReducer,
  setIsSearching: setIsSearchingReducer,
  setTrendingSearchArticles: setTrendingSearchArticlesReducer,
} = articleSlice.actions;

export default articleSlice.reducer;
