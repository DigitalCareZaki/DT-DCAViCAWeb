import { create, test, enforce } from 'vest';

import type { CreateVideoProps } from './types';
import type { VideoPriority, VideoCategory } from '@types';

const ValidVideoPriorityType: VideoPriority[] = ['HIGH', 'LOW', 'UNDEFINED'];

const validVideoCategoryType: VideoCategory[] = ['INFORMATIONAL', 'MARKETING'];

export const validator = create((data: CreateVideoProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('description', 'Description is required', () => {
    enforce(data.description).isNotEmpty();
  });

  test('uri', 'Link is required', () => {
    enforce(data.uri).isNotEmpty();
  });

  test('priority', 'Priority is required', () => {
    enforce(data.priority).isNotEmpty();
  });

  test(
    'priority',
    `Priority must be ${ValidVideoPriorityType.join(', or ')}`,
    () => {
      enforce(data.priority).inside(ValidVideoPriorityType);
    }
  );

  test('category', 'Category is required', () => {
    enforce(data.category).isNotEmpty();
  });

  test(
    'category',
    `Category must be ${validVideoCategoryType.join(', or ')}`,
    () => {
      enforce(data.category).inside(validVideoCategoryType);
    }
  );
});
