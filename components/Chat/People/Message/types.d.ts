export type MessageProps = {
  id?: string;
  users?: {
    first_name: string;
    last_name: string;
    middle_name: string;
    id: string;
    uri: string;
    email: string;
    role: string;
  }[];
};
