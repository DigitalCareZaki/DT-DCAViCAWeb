import { BaseSyntheticEvent } from '@react';

import type { UseFormRegister, FieldErrors } from '@react-hook-form';

import type { VideoPriority, VideoCategory } from '@types';

export interface CreateVideoProps {
  title: string;
  description: string;
  uri: string;
  priority: VideoPriority;
  category: VideoCategory;
}

export interface SelectorProps {
  priority: VideoPriority | undefined;
  category: VideoCategory | undefined;
}

export type UseFormProps = [
  register: UseFormProps<CreateVideoProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<CreateVideoProps>,
  loading: boolean,
  handleSelect: (type: string) => (val: string) => void,
  selectors: SelectorProps,
];
