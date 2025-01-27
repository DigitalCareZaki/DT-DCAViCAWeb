'use client';

import { useMemo, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { CircleSpinner } from 'react-spinners-kit';
import { useRouter } from 'next/navigation';

import { showModalReducer } from '@slice';
import { sendMessageAction } from '@service';

import type { ClientComponentProps } from '@types';
import type { ModalState } from '@store-types';
import type { Props } from './type';

const Action: ClientComponentProps<Props> = ({
  icon,
  label,
  actionType,
  messageId,
  active,
  activeIcon,
  onSuccess,
  disableOnActive,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const handleSnackbar = (props: ModalState) =>
    dispatch(showModalReducer({ ...props }));

  const handleClick = async () => {
    try {
      if (!messageId || !actionType) return;

      if (disableOnActive && active) return;

      setLoading(true);

      const res = await sendMessageAction(messageId, actionType);

      if (!res.success) throw new Error(res.message);

      handleSnackbar({
        type: 'SUCCESS',
        message: `message ${actionType?.split('')[0].toUpperCase()}${actionType?.slice(1, actionType?.length)}`,
        show: true,
      });
      onSuccess?.call(this);

      setLoading(false);

      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      handleSnackbar({
        type: 'ERROR',
        show: true,
        message: err?.message ?? 'Something went wrong',
      });
    } finally {
    }
  };

  const Render = {
    content: (
      <>
        {active ? activeIcon : icon}
        <span>{label}</span>
      </>
    ),
    loading: <CircleSpinner size={20} color="#000000" />,
  };

  return (
    <div
      onClick={handleClick}
      className={
        'flex cursor-pointer items-center gap-2 rounded-lg p-2 font-medium text-gray-500 transition duration-300 hover:bg-gray-200'
      }
    >
      {Render[loading ? 'loading' : 'content']}
    </div>
  );
};

export default Action;
