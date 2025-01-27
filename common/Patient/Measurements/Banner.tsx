'use server';

import { getUserTypeHeaders } from '@actions';

import { data } from './constants';

import Card from './Card';

import type { ServerComponentProps } from '@types';
import type { BannerProps, MeasurementCardType } from './types';

const Banner: ServerComponentProps<BannerProps> = async ({ patient, type }) => {
  const userType = await getUserTypeHeaders();

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
