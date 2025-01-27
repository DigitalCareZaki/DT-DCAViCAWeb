export type useUserTypeProps = () => Promise<[string | null]>;

export type useFetchReturnProps = [
  handleFetch: (uri: string, method: string) => Promise<void>,
  loading: boolean,
  data: any,
  error: string | null,
];
