'use client';

import { useEffect, useState } from 'react';

type Props = {
    value: string | number | Date | null | undefined;
    fallback?: string;
};

const LocalDateTime = ({ value, fallback = '-' }: Props) => {
    const [formatted, setFormatted] = useState<string>(fallback);

    useEffect(() => {
        if (!value) {
            setFormatted(fallback);
            return;
        }

        const date = value instanceof Date ? value : new Date(value);

        if (Number.isNaN(date.getTime())) {
            setFormatted(fallback);
            return;
        }

        setFormatted(
            new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(date)
        );
    }, [fallback, value]);

    return <>{formatted}</>;
};

export default LocalDateTime;