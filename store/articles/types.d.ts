import type { ArticleProps } from '@types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type StoreArticlesState = {
  articles: ArticleProps[];
  trendingSearchArticles: ArticleProps[];
  isSearching: boolean;
};


export type SetIsSearching = (
  state: StoreArticlesState,
  payload: PayloadAction<boolean>
) => void;

export type SetTrendingSearchArticles = (
  state: StoreArticlesState,
  payload: PayloadAction<{ articles: ArticleProps[] }>
) => void;

export type SetArticles = (
  state: StoreArticlesState,
  payload: PayloadAction<{ articles: ArticleProps[] }>
) => void;

export type PushInArticles = (
  state: StoreArticlesState,
  payload: PayloadAction<{ articles: ArticleProps }>
) => void;
