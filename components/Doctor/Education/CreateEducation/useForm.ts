'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { vestResolver } from '@hookform/resolvers/vest';

import { showModalReducer } from '@slice';
import { useUser } from '@selectors';
import { uploadFile, createArticle } from '@service';

import { validator } from './validator';

import type { UseFormProps, CreateArticleProps } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (): UseFormProps => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [, setForceRender] = useState(false);
  const [referenceValue, setReferenceValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<undefined | File>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    setError,
  } = useForm<CreateArticleProps>({
    resolver: vestResolver(validator),
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const handleReferenceValue = (e: ChangeEvent<HTMLInputElement>) =>
    setReferenceValue(e.target.value);

  const handlePushReference = useCallback(() => {
    let reference: string[] = [];
    reference = getValues('references');

    if (!referenceValue) {
      setError('references', { message: 'Reference is empty' });
      return;
    }

    clearErrors('references');

    if (!reference) {
      reference = [];
    }

    reference.push(referenceValue);

    setValue('references', reference);
    setReferenceValue('');
  }, [clearErrors, getValues, setError, setValue, referenceValue]);

  const handlePopReference = useCallback(
    (pos: number) => {
      const reference = getValues('references');

      const computed = reference.filter((_, index) => index !== pos);

      setValue('references', computed);
      setForceRender((prev) => !prev);
    },
    [getValues, setValue]
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!selectedFile) throw new Error('Please select image');
      if (!user.token) throw new Error('Unexpted error occured please reload');
      setLoading(true);

      const formdata = new FormData();

      formdata.append('file', selectedFile);

      const fileRes = await uploadFile(formdata);

      if (!fileRes.success) {
        throw new Error(fileRes.message);
      }

      const payload = {
        title: data.title,
        content: data.content.toString(),
        uri: fileRes.url,
        refrence: data.references ?? [],
        additional_uri: [],
      };

      // const res = await createArticle(btoa(encodedData));
      const res = await createArticle(payload);

      if (!res?.success) {
        throw new Error(fileRes.message);
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'Article posted',
        show: true,
      });

      router.push('/doctor/education');
    } catch (err: any) {
      handleShowModal({
        type: 'ERROR',
        message: err?.message || 'Something went wrong',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  });

  return [
    register,
    onSubmit,
    errors,
    loading,
    handlePushReference,
    getValues('references'),
    handleReferenceValue,
    referenceValue,
    handlePopReference,
    handleFileChange,
    selectedFile,
  ];
};

export default useFormHook;
