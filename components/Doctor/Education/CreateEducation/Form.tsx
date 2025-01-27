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

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
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
  ] = useForm();

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
      <ButtonPrimary name="Save" loading={loading} />
    </form>
  );
};

export default Form;
