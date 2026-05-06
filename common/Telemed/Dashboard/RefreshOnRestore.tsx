'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RefreshOnRestore = (): null => {
  const router = useRouter();

  useEffect(() => {
    const refreshDashboard = () => {
      router.refresh();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) refreshDashboard();
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [router]);

  return null;
};

export default RefreshOnRestore;
