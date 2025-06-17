'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';

import { composeMessage, searchUsersMessages } from '@service';
import { useUser } from '@selectors';
import {
  showModalReducer,
  toggleComposeMessageReducer,
  handleEventReducer,
  composeEmailReducer,
} from '@slice';
import { debounce, getName } from '@init-globals';

import { validator } from './validator';

import type { UseFormProps, MessageComposeProps } from './types';
import type { MessageSearchUserProps } from '@types';
import type { ModalState, ReduxProps, StoreGlobalState } from '@store-types';

const useFormHook = (): UseFormProps => {
  const [user] = useUser();
  const { composeMessage: composeMessageState } = useSelector<
    ReduxProps,
    StoreGlobalState
  >((state) => state.global);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState(0);
  const [users, setUsers] = useState<MessageSearchUserProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<MessageComposeProps>({
    resolver: vestResolver(validator),
  });

  const handleShowSnackbar = (props: ModalState) =>
    dispatch(showModalReducer({ ...props }));

  const closeComposeMessage = () => dispatch(toggleComposeMessageReducer());

  const closeComposeReply = () => {
    // Clear parent_id and close modal if open
    dispatch(composeEmailReducer({ to: '', subject: '', parent_id: '' }));
    dispatch(toggleComposeMessageReducer());
  };

  const handleSearchChange = debounce(
    async (e: ChangeEvent<HTMLInputElement>[]) => {
      try {
        setSearching(true);
        const res = await searchUsersMessages(e[0].target.value);

        if (!res.success) return;

        setUsers(res.data);
      } catch (err) {
      } finally {
        setSearching(false);
      }
    },
    1000
  );

  const handleSelectUser = (value: string) => {
    setValue('send_to', value);
    setForceRender((prev) => prev + 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!data?.content?.trimHTML()?.trim()?.length) {
        handleShowSnackbar({
          type: 'ERROR',
          message: 'Content is empty',
          show: true,
        });
        return;
      }

      setLoading(true);

      // Always include parent_id in the payload
      const payload = {
        ...data,
        attachments: Array.isArray(composeMessageState.attachments) && composeMessageState.attachments.length > 0
          ? composeMessageState.attachments
          : [],
        parent_id: composeMessageState.parent_id || null,
      };

      const res = await composeMessage(
        btoa(
          JSON.stringify(payload)
        )
      );

      if (!res.success) {
        handleShowSnackbar({
          message: res?.message,
          type: 'ERROR',
          show: true,
        });
        return;
      }

      handleShowSnackbar({
        message: 'Message sent',
        type: 'SUCCESS',
        show: true,
      });

      dispatch(
        handleEventReducer({
          event: 'send_notification',
          payload: {
            sender_id: user.id,
            reciever_id: data.send_to,
            message: `${getName({
              first_name: user.first_name ?? '',
              last_name: user.last_name ?? '',
              middle_name: user.middle_name,
            })} sended you a email '${data.content?.trimHTML()}'`,
            title: 'New email',
          },
        })
      );

      // Close reply section if replying, otherwise close modal
      if (composeMessageState.parent_id) {
        closeComposeReply();
      } else {
        closeComposeMessage();
      }
    } catch (err: any) {
      handleShowSnackbar({
        message: err?.message ?? 'Something went wrong',
        type: 'ERROR',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  });

  const handleChangeEditorValue = (value: string) => {
    setValue('content', value);
  };

  useEffect(() => {
    if (composeMessageState.to) {
      setValue('send_to', composeMessageState.to);
    }

    if (composeMessageState.subject) {
      setValue('subject', composeMessageState.subject);
    }

    if (composeMessageState.content) {
      setValue('content', composeMessageState.content);
    }
  }, [composeMessageState, setValue]);

  return [
    register,
    onSubmit,
    errors,
    loading,
    handleChangeEditorValue,
    composeMessageState.content,
    handleSearchChange,
    searching,
    users,
    handleSelectUser,
    getValues('send_to'),
  ];
};

export default useFormHook;
