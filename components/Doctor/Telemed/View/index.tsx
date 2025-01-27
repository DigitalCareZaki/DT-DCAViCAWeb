'use server';

import { TelemedViewMeeting } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const ViewTelemed: ServerComponentProps<Props> = async ({ id }) => {
  return <TelemedViewMeeting id={id} />;
};

export default ViewTelemed;
