'use server';

import { getUserTypeHeaders } from '@actions';
import { ButtonPrimary } from '@common';

import type { ServerComponent } from '@types';
import Link from 'next/link';

const CreateArticle: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();

  if (userType !== 'DOCTOR') return <></>;

  return (
    <Link passHref href={`/${userType.toLowerCase()}/education/create`}>
      <div className="flex w-full justify-end">
        <ButtonPrimary name="Create Article" icon="IoMdAdd" variant="icon" />
      </div>
    </Link>
  );
};

export default CreateArticle;
