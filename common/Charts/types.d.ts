export type AppointmentsProps = {
  colors?: Array<string>;
  subtractHeight?: number;
};

export interface ECGChartProps {
  data: number[];
  width?: string | number;
  height?: string | number;
}

export type ComplianceProps = {
  colors?: Array<string>;
  data: {
    [key: string]: {
      total: number;
      taken: number;
      not_taken: number;
      pending: number;
      not_action_taken: number;
    };
  };
};

export type ProgressLevelProps = {
  colors?: Array<string>;
};

export type DonutProps = {
  title: string;
  values: [number, number, number, number];
};
