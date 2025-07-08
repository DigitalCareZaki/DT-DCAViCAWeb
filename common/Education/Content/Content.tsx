'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticlesReducer } from '@slice';

import ArticleRender from '../ArticleRender';

import type { ClientComponentProps, ArticleProps } from '@types';
import type { ContentProps } from '../types';

const Content: ClientComponentProps<ContentProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setArticles = (articles: ArticleProps[]) =>
    dispatch(setArticlesReducer({ articles }));

  useEffect(() => {
    setArticles(data);
  }, [data]);

  return (
    <div className="flex h-screen w-[60%] flex-col gap-4 overflow-y-scroll pb-96">
      <ArticleRender />
    </div>
  );
};

export default Content;
