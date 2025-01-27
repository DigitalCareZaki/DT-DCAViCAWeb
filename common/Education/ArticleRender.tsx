'use client';

import { useSelector } from 'react-redux';

import Post from './Post';
import Postfallback from './Post/Loading';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreArticlesState } from '@store-types';

const ArticleRender: ClientComponent = () => {
  const { articles } = useSelector<ReduxProps, StoreArticlesState>(
    (state) => state.articles
  );

  if (!articles.length) {
    return (
      <>
        {new Array(10).fill(null).map((_, index) => (
          <Postfallback key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {articles.map((article) => (
        <Post {...article} key={article.id} />
      ))}
    </>
  );
};

export default ArticleRender;
