import type { OrganizationUsersProps } from '@types';

export type RenderTableProps = {};

export type TableProps = {
  data: OrganizationUsersProps[];
};

export type Props = { role: string };

export type DonutProps = {
  title: string;
  values: [number, number];
  total: number;
};

type GraphResultValue = {
  active: number;
  unactive: number;
  total: number;
};

export type GraphResult = {
  admin: GraphResultValue;
  doctor: GraphResultValue;
  nurse: GraphResultValue;
  patient: GraphResultValue;
};
