'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { InputBasic, ButtonPrimary } from '@common';
import { updateTablet, getSingleTablet } from '@service';
import { showModalReducer } from '@slice';
import type { ModalState } from '@store-types';

interface EditAccessoryModalProps {
    tabletId: string;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    title: string;
    serial_number: string;
}

const EditAccessoryModal = ({ tabletId, onClose, onSuccess }: EditAccessoryModalProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();

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

    // Fetch tablet data when modal opens
    useEffect(() => {
        const fetchTabletData = async () => {
            try {
                setFetchingData(true);
                const res = await getSingleTablet(tabletId);

                if (res.success && res.data) {
                    setValue('title', res.data.title);
                    setValue('serial_number', res.data.serial_number);
                } else {
                    handleShowModal({
                        type: 'ERROR',
                        message: 'Unable to fetch accessory details',
                        show: true,
                    });
                    onClose();
                }
            } catch (error) {
                handleShowModal({
                    type: 'ERROR',
                    message: 'Error fetching accessory details',
                    show: true,
                });
                onClose();
            } finally {
                setFetchingData(false);
            }
        };

        fetchTabletData();
    }, [tabletId]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);

            const payload = {
                title: data.title,
                serial_number: data.serial_number,
                category: 'ECG',
            };

            const res = await updateTablet(
                btoa(JSON.stringify(payload)),
                tabletId
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

            onSuccess();
            onClose();
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit Accessory</h2>

                {fetchingData ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        {/* Title and Serial Number Row */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
                            <div className="w-full sm:w-1/2">
                                <InputBasic
                                    title="Title ID"
                                    label="Title"
                                    placeholder="Enter title"
                                    icon="SiNamecheap"
                                    borderTheme
                                    inputWrapperClassName="bg-background"
                                    inputClassName="bg-background"
                                    hookProps={register('title', {
                                        required: 'Title is required',
                                    })}
                                    error={!!errors.title}
                                    errorMessage={errors.title?.message || '&'}
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <InputBasic
                                    title="Serial Number"
                                    label="Serial Number"
                                    placeholder="Enter serial number"
                                    icon="SiNamecheap"
                                    borderTheme
                                    inputWrapperClassName="bg-background"
                                    inputClassName="bg-background"
                                    hookProps={register('serial_number', {
                                        required: 'Serial number is required',
                                    })}
                                    error={!!errors.serial_number}
                                    errorMessage={errors.serial_number?.message || '&'}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <ButtonPrimary
                                title="Update"
                                name="Update"
                                loading={loading}
                                className="h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl"
                            />
                            <ButtonPrimary
                                type="button"
                                title="Close"
                                name="Close"
                                onClick={onClose}
                                className="h-12 bg-gray-500 px-4 py-2 text-lg hover:bg-gray-600 sm:text-xl lg:text-xl"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditAccessoryModal;
