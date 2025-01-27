export interface ExportProps<T> {
  data: T[];
  headers: { label: string; key: string }[];
  filename?: string;
}
