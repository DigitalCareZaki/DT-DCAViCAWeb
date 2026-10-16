import { create, test, enforce } from 'vest';

import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  isAllowedFileType,
} from './fileRules';

import type { AddEMRRecordProps } from './types';

export const validator = create((data: AddEMRRecordProps) => {
  test('title', 'Title is required', () => {
    enforce(data.title).isNotEmpty();
  });

  test('title', 'Title is too short', () => {
    if (data.title.length < 3) throw new Error();

    return true;
  });

  test('title', 'Title is too long', () => {
    if (data.title.length > 100) throw new Error();

    return true;
  });

  test('file', 'Only PDF, JPG and PNG files are allowed', () => {
    if (data.file && !isAllowedFileType(data.file)) throw new Error();

    return true;
  });

  test('file', `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit`, () => {
    if (data.file && data.file.size > MAX_FILE_SIZE_BYTES) throw new Error();

    return true;
  });
});
