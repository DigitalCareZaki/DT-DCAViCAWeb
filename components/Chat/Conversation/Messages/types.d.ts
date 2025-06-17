export type SenderProps = {
  message: string;
  sendedAt: string;
  author: any;
  media: string | undefined;
};

export type RecieverProps = {
  message: string;
  sendedAt: string;
  author: any;
  media: string | undefined;
};

export type SenderMediaProps = {
  src: string;
  sendedAt: string;
};