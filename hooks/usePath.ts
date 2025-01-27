import { headers } from 'next/headers';

import { routes } from '@constants';

export default function usePath() {
  const _headers = headers();

  return routes.find((el) => el.pathname === _headers.get('x-pathname'));
}
