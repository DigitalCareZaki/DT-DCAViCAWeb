import { getFileExtension } from '@init-globals';

export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png'];
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// Value for the file input's `accept` attribute
export const ACCEPTED_FILE_TYPES = [
  ...ALLOWED_EXTENSIONS.map((extension) => `.${extension}`),
  ...ALLOWED_MIME_TYPES,
].join(',');

export const isAllowedFileType = (file: File) =>
  ALLOWED_MIME_TYPES.includes(file.type) ||
  ALLOWED_EXTENSIONS.includes(getFileExtension(file.name));

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
