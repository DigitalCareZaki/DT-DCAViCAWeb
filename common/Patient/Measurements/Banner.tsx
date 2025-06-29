'use client';

import { useEffect, useState } from 'react';
import { getUserTypeHeaders } from '@actions';

import { data } from './constants';

import Card from './Card';

import type { FC } from 'react';
import type { BannerProps, MeasurementCardType } from './types';

const Banner: FC<BannerProps> = ({ patient, type }) => {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const userTypeData = await getUserTypeHeaders();
        setUserType(userTypeData);
      } catch (error) {
        console.error('Error loading user type:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserType();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userType) return <></>;

  return (
    <div className="flex h-12 w-full flex-row gap-4">
      {data.map((item, idx) => (
        <Card
          key={idx}
          id={item.id as MeasurementCardType}
          title={item.title}
          Icon={item.Icon}
          patient={patient}
          type={type}
          userType={userType?.toLowerCase()}
        />
      ))}
    </div>
  );
};

export default Banner;
