'use client';

import {
  EditorBasic,
  ButtonPrimary,
  InputBasic,
  InputDropdown,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import User from './User';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
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
    <div className="h-[80vh] overflow-auto bg-white p-4">
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
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <ButtonPrimary name="Send" icon="IoSend" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Form;
