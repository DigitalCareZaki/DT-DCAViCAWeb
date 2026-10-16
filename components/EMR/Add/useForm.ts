import { type ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { vestResolver } from '@hookform/resolvers/vest';

import { showModalReducer } from '@slice';
import { uploadFile, addPatientEMRRecord } from '@service';

import { validator } from './validator';

import type { AddEMRRecordProps, UseFormProps } from './types';
import type { ModalState } from '@store-types';
import { setEmrRecordsSlice } from '@slice';
const useFormHook = (type: string, patient_id: any): UseFormProps => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddEMRRecordProps>({
    resolver: vestResolver(validator),
  });

  const selectedFile = watch('file');

  const handleSelectFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      // Reset so picking the same file again still fires onChange
      e.target.value = '';

      if (file) setValue('file', file, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('file', undefined, { shouldValidate: true });
  }, [setValue]);

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      let uri = null;
      if (data.file) {
        const formdata = new FormData();
        formdata.append('file', data.file);
        const res = await uploadFile(formdata);
        if (!res.success) {
          throw new Error(res?.message ?? 'File upload failed');
        }
        uri = res.url;
      }

      const payload = {
        patient_id: patient_id,
        uri: uri,
        title: data.title,
        description: data.description,
        type,
      };

      const result = await addPatientEMRRecord(btoa(JSON.stringify(payload)));

      if (!result.success) {
        throw new Error(result?.message ?? 'Failed to add EMR record');
      }

      // dispatch(setEmrRecordsSlice(result.));

      handleShowModal({
        type: 'SUCCESS',
        message: 'Record added',
        show: true,
      });

      router.back();
    } catch (err: any) {
      handleShowModal({
        type: 'ERROR',
        message: err?.message ?? 'Something went wrong',
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
    handleSelectFile,
    selectedFile,
    handleRemoveFile,
  ];
};

export default useFormHook;
