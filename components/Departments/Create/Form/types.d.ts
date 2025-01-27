import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface DepartmentProps {
  title: string;
  description: string;
  address: string;
  zipcode: string;
  branch_id: string;
  city: string;
}

export type UseFormProps = [
  register: UseFormRegister<DepartmentProps>,
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>,
  FieldErrors<DepartmentProps>,
  loading: boolean,
  branches: ValuesProps[],
  selectedValues: SelectedValuesProps,
  handleSelect: (type: string) => (props: ValuesProps) => void,
  cities: ValuesProps[],
];

export interface ValuesProps {
  id: string;
  name: string;
}

export interface SelectedValuesProps {
  [key: string]: {
    id: string | undefined;
    name: string | undefined;
  };
}
