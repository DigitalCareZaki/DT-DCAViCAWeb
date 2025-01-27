'use server';

import fetch from '@fetch';
import { GetVideosProps } from '../types';

const getVideos = async (): Promise<GetVideosProps> => {
  const res = await fetch(`/api/v1/web/videos`.convertURI());

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
};

export default getVideos;
