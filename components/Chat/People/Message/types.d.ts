export type MessageProps = {
  id?: string;
  users?: {
    hasNewMessage?: any;
    first_name: string;
    last_name: string;
    middle_name: string;
    id: string;
    uri: string;
    email: string;
    role: string;
  }[];
};