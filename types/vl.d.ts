// export type VLAllPatients = {
//   [key: str]: Array<str>;
// };

export type VLAllPatients = Record<string, string[]>;

export type VLSinglePatientECG = {
  ecg: {
    time: number;
    mv: number;
  }[][];
  timePerPoint: number;
  samplingFrequency: number;
};
