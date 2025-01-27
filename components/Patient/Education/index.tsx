'use server';

import { Education as EducationCommon } from '@common';

import type { ServerComponent } from '@types';

const EducationWrapper: ServerComponent = async () => {
  return <EducationCommon />;
};

export default EducationWrapper;
