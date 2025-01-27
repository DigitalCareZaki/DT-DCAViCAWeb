import type { AppointmentStats } from '@types';
import type { PatientListingData } from '@types-services';

export type Props = {
  appointments: AppointmentStats;
  compliance: any;
  rag: Rag;
};

export type Rag = {
  bloodpressure: [number, number, number, number];
  spo2: [number, number, number, number];
  bloodglucose: [number, number, number, number];
  temperature: [number, number, number, number];
};

export type PillProps = {
  title: string;
  value: string;
};

export type TableProps = {
  userType: string;
  data: PatientListingData[];
};

export type HeaderProps = {
  data: PatientListingData[];
};
