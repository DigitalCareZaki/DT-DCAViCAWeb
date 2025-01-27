'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createTablet, updateTablet } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, SelectedValuesProps, TabletProps } from './types';
import type { ModalState } from '@store-types';
import type { MeasurementType } from '@types';

const useFormHook = (
  prevData:
    | (TabletProps & {
        id: string;
      })
    | undefined,
  categories: { name: string; value: string }[]
): UseFormProps => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedValues, setSelectedValues] = useState<SelectedValuesProps>({
    category: {
      name: undefined,
      value: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<TabletProps>({
    resolver: vestResolver(validator),
  });

  const handleSelect = useCallback((name: string, value: string) => {
    setValue('category', value as MeasurementType);
    clearErrors('category');

    setSelectedValues({
      category: {
        name,
        value: value as MeasurementType,
      },
    });
  }, []);

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      // create case
      if (!prevData) {
        const res = await createTablet(
          btoa(
            JSON.stringify({
              title: data.title,
              serial_number: data.serial_number,
              category: data.category,
            })
          )
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: res?.message ?? 'Unable to create a new tablet',
            show: true,
          });
          return;
        }
      } else {
        // update case
        const res = await updateTablet(
          btoa(
            JSON.stringify({
              title: data.title,
              serial_number: data.serial_number,
              category: data.category,
            })
          ),
          prevData.id
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: res?.message ?? 'Unable to update tablet',
            show: true,
          });
          return;
        }
      }

      handleShowModal({
        type: 'SUCCESS',
        message: `Tablet ${prevData ? 'updated' : 'added'} successfully`,
        show: true,
      });
      router.push(`/${user.role?.toLocaleLowerCase()}/tablets`);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  });

  // for edit case
  useEffect(() => {
    if (prevData) {
      reset(prevData);
      setSelectedValues({
        category: {
          name:
            categories.find((cat) => cat.value === prevData.category)?.name ||
            prevData.category,
          value: prevData.category,
        },
      });
    }

    return () => {};
  }, [prevData]);

  return [register, onSubmit, errors, loading, selectedValues, handleSelect];
};

export default useFormHook;
