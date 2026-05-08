'use client';

import { useEffect, useState } from 'react';

type Props = {
  value: Date | string | number | null | undefined;
  fallback?: string;
};

const LocalMeetingTime = ({ value, fallback = '-' }: Props) => {
  const [formatted, setFormatted] = useState<string>(fallback);

  useEffect(() => {
    if (!value) {
      setFormatted(fallback);
      return;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      setFormatted(fallback);
      return;
    }

    setFormatted(
      new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(date)
    );
  }, [fallback, value]);

  return <>{formatted}</>;
};

export default LocalMeetingTime;
