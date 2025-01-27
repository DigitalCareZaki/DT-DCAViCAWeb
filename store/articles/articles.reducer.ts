import type { SetArticles, PushInArticles } from './types';

export const setArticles: SetArticles = (state, payload) => {
  state.articles = [...payload.payload.articles];
};

export const pushInArticles: PushInArticles = (state, payload) => {
  state.articles.push(payload.payload.articles);
};
