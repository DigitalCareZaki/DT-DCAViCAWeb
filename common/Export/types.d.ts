export interface ExportProps<T> {
  data: T[];
  headers: { label: string; key: string, width?: string }[];
  filename?: string;
}
