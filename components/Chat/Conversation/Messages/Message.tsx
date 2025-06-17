'use client';

import Sender from './Sender';
import Reciever from './Reciver';
import { timeAgo } from '@init-globals';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import { useMemo } from 'react';

const Message: ClientComponentProps<any> = ({
  message,
  created_at,
  author_id,
  author,
  room_id,
  media,
}) => {
  const [user] = useUser();

  const isSender = useMemo(() => author_id === user.id, [user.id, author_id]);

  if (isSender) {
    return (
      <Reciever
        message={message}
        sendedAt={timeAgo(created_at)}
        author={author}
        media={media}
      />
    );
  }

  return (
    <Sender
      message={message}
      sendedAt={timeAgo(created_at)}
      author={author}
      media={media}
    />
  );
};

export default Message;