'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createVideo, createVideoSuperadmin, getSuperAdminBranches } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, CreateVideoProps, SelectorProps } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (): any => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectors, setSelectors] = useState<SelectorProps>({
    priority: undefined,
    category: undefined,
    branch_id: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreateVideoProps>({
    resolver: vestResolver(validator),
  });

  // Fetch branches for superadmin
  useEffect(() => {
    const fetchBranches = async () => {
      if ((user?.role as any) === 'SUPERADMIN') {
        const res = await getSuperAdminBranches();
        if (res?.success && Array.isArray(res.data)) {

          setBranches(res.data);
        }
      }
    };
    fetchBranches();
  }, [user]);

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const payload: any = {
        title: data.title,
        description: data.description,
        uri: data.uri,
        priority: data.priority,
        category: data.category,
      };
      if ((user?.role as any) === 'SUPERADMIN' && selectors.branch_id) {
        payload.branch_id = selectors.branch_id;
      }

      const isSuperadmin = (user?.role as any) === 'SUPERADMIN';
      const res = isSuperadmin
        ? await createVideoSuperadmin(btoa(JSON.stringify(payload)))
        : await createVideo(btoa(JSON.stringify(payload)));

      if (!res.success) {
        handleShowModal({
          type: 'ERROR',
          message: 'Unable to create a new video',
          show: true,
        });
        return;
      }
      handleShowModal({
        type: 'SUCCESS',
        message: `Video created successfully`,
        show: true,
      });
      router.push(`/${user.role?.toLocaleLowerCase()}/videos`);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  });

  const handleSelect = (type: string) => (val: string) => {
    setSelectors((prev) => ({ ...prev, [type]: val }));
    setValue(type as any, val);
    clearErrors(type as any);
  };

  return [register, onSubmit, errors, loading, handleSelect, selectors, branches];
};

export default useFormHook;
