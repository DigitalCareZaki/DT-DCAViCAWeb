'use client';

import { useEffect, useState } from 'react';
import VideosClient from './Home/VideosClient';
import { getVideos, getUser } from '@service';

import type { ClientComponent } from '@types';

const Videos: ClientComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getVideos(), getUser()]).then(([res, user]) => {
      if (res.success && res.data && user?.role) {
        setData(res.data);
        setUserRole(user.role);
      }
    });
  }, []);

  if (!data.length || !userRole) return <></>;

  return <VideosClient data={data} userRole={userRole} />;
};

export default Videos;