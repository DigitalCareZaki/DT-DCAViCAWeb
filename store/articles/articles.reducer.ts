import type { SetArticles, PushInArticles, SetIsSearching, SetTrendingSearchArticles } from './types';

export const setArticles: SetArticles = (state, payload) => {
  state.articles = [...payload.payload.articles];
};

export const setTrendingSearchArticles: SetTrendingSearchArticles = (state, payload) => {
  state.trendingSearchArticles = [...payload.payload.articles];
};

export const setIsSearching: SetIsSearching = (state, payload) => {
  state.isSearching = payload.payload;
};

export const pushInArticles: PushInArticles = (state, payload) => {
  state.articles.push(payload.payload.articles);
};
