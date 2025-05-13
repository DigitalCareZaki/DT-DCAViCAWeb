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

  const [selectedFile, setSelectedFile] = useState<undefined | File>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEMRRecordProps>({
    resolver: vestResolver(validator),
  });

  const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!selectedFile) throw new Error('Please select image');

      setLoading(true);

      const formdata = new FormData();

      formdata.append('file', selectedFile);

      const res = await uploadFile(formdata);

      if (!res.success) {
        throw new Error(res?.message ?? 'File upload failed');
      }

      const payload = {
        patient_id: patient_id,
        uri: res.url,
        title: data.title,
        description: data.description,
        type,
      };


      const result = await addPatientEMRRecord(btoa(JSON.stringify(payload)));


      if (!result.success) {
        throw new Error(res?.message ?? 'Failed to add EMR record');
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

  return [register, onSubmit, errors, loading, handleSelectFile, selectedFile];
};

export default useFormHook;
