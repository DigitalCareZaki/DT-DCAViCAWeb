'use client';

import {
  ButtonPrimary,
  ClientGenerator,
  InputBasic,
  TextArea,
  FilePicker,
} from '@common';

import useForm from './useForm';
import Reference from './Reference';
import { useRouter } from 'next/navigation';

import type { ClientComponent } from '@types';
import { useState } from 'react';

const Form: ClientComponent = () => {
  const router = useRouter();
  const [saveType, setSaveType] = useState<'save' | 'saveAndClose' | 'close'>("save");
  const [
    register,
    onSubmit,
    errors,
    loading,
    pushReference,
    references,
    handleReference,
    reference,
    handlePopReference,
    handleFileChange,
    selectedFile,
  ] = useForm(saveType);

  const handleSave = () => {
    setSaveType('save');
  };

  const handleClose = () => {
    // setSaveType('close');
    router.back();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-12"
    >
      <div className="flex w-full items-center justify-center">
        <FilePicker
          type="image"
          src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
          accept="*"
          handleFileChange={handleFileChange}
        />
      </div>
      <div className="w-full">
        <InputBasic
          label="Title"
          placeholder="Enter article title"
          title="Article title"
          icon="SiNamecheap"
          borderTheme
          inputWrapperClassName="bg-background"
          inputClassName="bg-background"
          hookProps={register('title')}
          error={!!errors?.title?.message?.length}
          errorMessage={errors.title?.message || '&'}
        />
      </div>
      <div className="w-full ">
        <TextArea
          label="Content"
          placeholder="Write article content"
          title="Write article content"
          icon="BiSolidMessageSquareEdit"
          borderTheme
          inputWrapperClassName="bg-background h-32"
          inputClassName="bg-background"
          hookProps={register('content')}
          error={!!errors?.content?.message?.length}
          errorMessage={errors.content?.message || '&'}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <InputBasic
          label="Refrences"
          placeholder="Enter article references"
          title="Add references to your article"
          icon="VscReferences"
          borderTheme
          inputWrapperClassName="bg-background"
          inputClassName="bg-background"
          error={!!errors?.references?.message?.length}
          errorMessage={errors.references?.message || '&'}
          onChange={handleReference}
          value={reference}
        />
        <div className=" h-10 w-10 shrink-0">
          <ButtonPrimary
            name=""
            className="h-full"
            icon="MdOutlineKeyboardReturn"
            variant="icon-only"
            onClick={pushReference}
          />
        </div>
      </div>
      <div className="hidescrollbar flex w-full items-center gap-2 overflow-x-scroll">
        <ClientGenerator
          data={
            references?.map((el, index) => ({ title: el, pos: index })) ?? []
          }
          handlePopReference={handlePopReference}
        >
          <Reference />
        </ClientGenerator>
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
        <ButtonPrimary name="Save" loading={loading} className='w-[50%]' type="submit" onClick={handleSave} />
        <ButtonPrimary name="Close" loading={false} className='w-[50%]' type="button" onClick={handleClose} />
      </div>
    </form>
  );
};

export default Form;
