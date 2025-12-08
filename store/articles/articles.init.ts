import type { StoreArticlesState } from './types';

const initState: StoreArticlesState = {
  articles: [],
  trendingSearchArticles: [],
  isSearching: false,
};

export default initState;
