import type { ChangeEvent, FormEvent } from 'react';

export interface PincodeProps {
  show: boolean;
  handleReset: () => void;
}

export type UsePincodeProps = (
  handleReset: () => void
) => [
  string,
  string,
  boolean,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: FormEvent<HTMLFormElement>) => Promise<void>,
];
