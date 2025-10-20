'use client';

import { useEffect, useState } from 'react';
import VideosClient from './Home/VideosClient';
import { getVideos, getUser } from '@service';

import type { ClientComponent } from '@types';

const Videos: ClientComponent = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const [res, user] = await Promise.all([getVideos(), getUser()]);
        // basic validation
        if (!mounted) return;

        if (res && res.success && Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }

        if (user && user.role) setUserRole(user.role);
        else setUserRole(null);
      } catch (err: any) {
        console.error('Failed to load videos or user:', err);
        if (mounted) setError('Failed to load videos. Please try again later.');
        setData([]);
        setUserRole(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);


  return <VideosClient data={data || []} userRole={userRole as any} />;
};

export default Videos;