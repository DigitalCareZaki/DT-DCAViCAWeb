'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createTablet, updateTablet, getSuperAdminBranches, createTabletSuperadmin } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, SelectedValuesProps, TabletProps, SelectorProps } from './types';
import type { ModalState } from '@store-types';
import type { MeasurementType } from '@types';

const useFormHook = (
  prevData:
    | (TabletProps & {
      id: string;
    })
    | undefined,
  categories?: { name: string; value: string }[],
  role?: string
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
    reset,
  } = useForm<TabletProps>({
    resolver: vestResolver(validator),
    context: { role },
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


  const handleSelect = useCallback(
    (name: string, value: string) => {
      if (name === 'category') {
        setValue('category', value as MeasurementType);
        clearErrors('category');

        setSelectedValues({
          category: {
            name,
            value: value as MeasurementType,
          },
        });
        return;
      }

      if (name === 'branch_id') {
        setSelectors((prev) => ({ ...prev, branch_id: value }));
        return;
      }
    },
    []
  );

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };


  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      // Prepare payload
      let payload: any = {
        title: data.title,
        serial_number: data.serial_number,
        category: "ECG",
      };

      if ((user?.role as any) === 'SUPERADMIN' && selectors.branch_id) {
        payload.branch_id = selectors.branch_id;
      }
      const isSuperadmin = (user?.role as any) === 'SUPERADMIN';

      const res = isSuperadmin
        ? await createTabletSuperadmin(btoa(JSON.stringify(payload)))
        : await createTablet(btoa(JSON.stringify(payload)));




      // create case
      if (!prevData) {
        // const res = await createTablet(
        //   btoa(
        //     JSON.stringify({
        //       title: data.title,
        //       serial_number: data.serial_number,
        //       category: "ECG",
        //     })
        //   )
        // );
        // console.log('res >>>>>', res);

        if (!res.success) {
          // Check for duplicate error message
          if (res?.message) {
            handleShowModal({
              type: 'ERROR',
              message: 'Accessory already exists in your organization.',
              show: true,
            });
          } else {
            handleShowModal({
              type: 'ERROR',
              message: res?.message ?? 'Accessory already exists.',
              show: true,
            });
          }
          return;
        } else {
          // Handle success case
          handleShowModal({
            type: 'SUCCESS',
            message: 'Accessory created successfully',
            show: true,
          });
          router.push(`/${user.role?.toLocaleLowerCase()}/tablets`);
        }

      } else {
        // update case

        const res = await updateTablet(
          btoa(
            JSON.stringify({
              title: data.title,
              serial_number: data.serial_number,
              category: "ECG",
            })
          ),
          prevData.id
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: res?.message ?? 'Unable to update Accessory',
            show: true,
          });
          return;
        }
        handleShowModal({
          type: 'SUCCESS',
          message: `Accessory updated successfully`,
          show: true,
        });
        router.push(`/${user.role?.toLocaleLowerCase()}/tablets`);
      }


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
            categories?.find((cat) => cat.value === prevData.category)?.name ||
            prevData.category,
          value: prevData.category as MeasurementType,
        },
      });
    }

    return () => { };
  }, [prevData]);

  return [
    register,
    onSubmit,
    errors,
    loading,
    selectedValues,
    handleSelect,
    selectors,
    branches,
  ];
};

export default useFormHook;
