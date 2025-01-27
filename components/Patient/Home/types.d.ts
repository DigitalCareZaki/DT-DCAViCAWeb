export type Props = {
  patient: string;
  type: string;
};

export type AnalyticsProps = {
  data: {
    bloodpressure: [number, number, number, number];
    spo2: [number, number, number, number];
    bloodglucose: [number, number, number, number];
    temperature: [number, number, number, number];
  };
};
