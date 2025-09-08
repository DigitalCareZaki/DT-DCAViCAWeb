'use client';

import {
  EditorBasic,
  ButtonPrimary,
  InputBasic,
  InputDropdown,
  ClientGenerator,
  Icon,
} from '@common';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import useForm from './useForm';
import { uploadFileS3 } from '@service';
import { composeEmailReducer } from '@slice';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import User from './User';

import type { ClientComponent } from '@types';

interface FormProps {
  inline?: boolean;
}

const Form: FC<FormProps> = ({ inline = false }) => {
  const dispatch = useDispatch();
  const { composeMessage } = useSelector<ReduxProps, StoreGlobalState>((s) => s.global);
  const [
    register,
    onSubmit,
    errors,
    loading,
    onChangeEditor,
    defaultContent,
    handleSearch,
    searching,
    users,
    handleSelectUser,
    selectedUser,
  ] = useForm();

  return (
    <div
      className={
        inline ? 'bg-white p-2' : 'h-[80vh] overflow-auto bg-white p-4'
      }
    >
      <form onSubmit={onSubmit} className="relative flex w-full flex-col gap-2">
        <InputDropdown
          label="To"
          placeholder="Enter receiver email address"
          title="Email receiver"
          inputWrapperClassName="bg-gray-100"
          inputClassName="bg-gray-100"
          icon="MdEmail"
          error={!!errors.send_to?.message?.length}
          errorMessage={errors.send_to?.message ?? '&'}
          loading={searching}
          onChange={handleSearch}
          overrideShow={0}
          selected={selectedUser}
        >
          <ClientGenerator data={users} handleSelect={handleSelectUser}>
            <User />
          </ClientGenerator>
        </InputDropdown>

        <InputBasic
          label="Subject"
          placeholder="Enter subject"
          title="Enter subject (Subject should be precise)"
          borderTheme
          inputWrapperClassName="bg-gray-100"
          inputClassName="bg-gray-100"
          icon="SiNamecheap"
          hookProps={register('subject')}
          error={!!errors.subject?.message?.length}
          errorMessage={errors.subject?.message ?? '&'}
        />
        <div>
          <EditorBasic
            onChange={onChangeEditor}
            defaultValue={defaultContent}
            extraToolbarContent={
              <button
                type="button"
                onClick={async () => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = async (event) => {
                    const file = (event.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    const next = Array.isArray(composeMessage.attachments)
                      ? [...composeMessage.attachments, file]
                      : [file];
                    dispatch(composeEmailReducer({ attachments: next }));
                  };
                  input.click();
                }}
                className="h-fit w-fit rounded-md bg-gray-100 p-2 transition duration-200 hover:bg-gray-200"
                title="Add attachment"
                aria-label="Add attachment"
              >
                <Icon name="IoDocumentText" size={16} className="text-gray-600" />
              </button>
            }
          />
          {composeMessage.attachments?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {composeMessage.attachments.map((item: any, idx: any) => {
                const isUrl = typeof item === 'string';
                const name = isUrl ? (item as string).split('/').pop() || 'attachment' : (item as File).name;
                return (
                  <div
                    key={`${name}-${idx}`}
                    className="group flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-700"
                    title={name}
                  >
                    <Icon name="IoDocumentText" size={14} className="text-gray-600" />
                    {isUrl ? (
                      <Link
                        href={item as string}
                        target="_blank"
                        rel="noreferrer"
                        className="max-w-[220px] truncate hover:underline"
                      >
                        {name}
                      </Link>
                    ) : (
                      <span className="max-w-[220px] truncate">{name}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const next = (composeMessage.attachments || []).filter((u: any, i: number) => i !== idx);
                        dispatch(composeEmailReducer({ attachments: next }));
                      }}
                      className="ml-1 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                      aria-label="Remove attachment"
                      title="Remove attachment"
                    >
                      <Icon name="IoClose" size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div
          className={
            inline
              ? 'flex w-full justify-end mt-2'
              : 'flex w-full items-center justify-between'
          }
        >
          <ButtonPrimary
            name="Send"
            icon="IoSend"
            loading={loading}
            className={inline ? 'w-auto px-6' : ''}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
