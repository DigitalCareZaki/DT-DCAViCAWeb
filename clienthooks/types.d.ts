export type UseImagePickerProps = () => [
  file: File | undefined,
  handleFilePicker: (accept?: string) => void,
  uri: string | undefined,
];
