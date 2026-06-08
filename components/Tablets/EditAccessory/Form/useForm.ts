'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { updateTablet } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, TabletProps } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (
    prevData:
        | (TabletProps & {
            id: string;
        })
        | undefined
): UseFormProps => {
    const dispatch = useDispatch();

    const router = useRouter();
    const [user] = useUser();

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<TabletProps>({
        resolver: vestResolver(validator),
    });

    const handleShowModal = (payload: ModalState) => {
        dispatch(showModalReducer(payload));
    };

    const getApiErrorMessage = (res: any, fallback = 'Something went wrong') => {
        return (
            res?.message?.toString?.()?.trim?.() ||
            res?.data?.message?.toString?.()?.trim?.() ||
            res?.error?.toString?.()?.trim?.() ||
            fallback
        );
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);

            if (!prevData?.id) {
                handleShowModal({
                    type: 'ERROR',
                    message: 'Invalid accessory ID',
                    show: true,
                });
                return;
            }

            // Prepare payload for update
            const payload = {
                title: data.title,
                serial_number: data.serial_number,
                category: "ECG",
            };

            const res = await updateTablet(
                btoa(JSON.stringify(payload)),
                prevData.id
            );

            if (!res.success) {
                handleShowModal({
                    type: 'ERROR',
                    message: getApiErrorMessage(res),
                    show: true,
                });
                return;
            }

            handleShowModal({
                type: 'SUCCESS',
                message: 'Accessory updated successfully',
                show: true,
            });

            router.push(`/${user.role?.toLocaleLowerCase()}/tablets`);

        } catch (err: any) {
            handleShowModal({
                type: 'ERROR',
                message: err?.message?.toString?.()?.trim?.() || 'Something went wrong',
                show: true,
            });
        } finally {
            setLoading(false);
        }
    });

    // Load initial data
    useEffect(() => {
        if (prevData) {
            reset({
                title: prevData.title,
                serial_number: prevData.serial_number,
            });
        }
    }, [prevData, reset]);

    return [
        register,
        onSubmit,
        errors,
        loading,
    ];
};

export default useFormHook;
