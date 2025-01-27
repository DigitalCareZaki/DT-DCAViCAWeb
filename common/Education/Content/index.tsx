import { getArticles } from '@service';

import Content from './Content';

import type { ServerComponent } from '@types';

const ContentParent: ServerComponent = async () => {
  const res = await getArticles();

  if (!res.success) return <></>;

  return <Content data={res.data} />;
};

export default ContentParent;
