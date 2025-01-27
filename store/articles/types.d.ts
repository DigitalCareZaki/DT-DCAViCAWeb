import type { ArticleProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreArticlesState = {
  articles: ArticleProps[];
};

export type SetArticles = (
  state: StoreArticlesState,
  payload: PayloadAction<{ articles: ArticleProps[] }>
) => void;

export type PushInArticles = (
  state: StoreArticlesState,
  payload: PayloadAction<{ articles: ArticleProps }>
) => void;
