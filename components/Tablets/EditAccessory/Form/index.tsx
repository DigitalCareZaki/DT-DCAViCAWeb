'use client';

import {
    InputBasic,
    ButtonPrimary,
} from '@common';

import useForm from './useForm';
import { useRouter } from 'next/navigation';
import type { ClientComponentProps } from '@types';
import type { EditAccessoryProps } from './types';

const Form: ClientComponentProps<EditAccessoryProps> = ({ data }) => {
    const [register, onSubmit, errors, loading] = useForm(data);
    const router = useRouter();

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6"
        >
            <h2 className="text-2xl font-bold text-gray-800">Edit Accessory</h2>

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
                        hookProps={register('title')}
                        error={!!errors.title?.message?.length}
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
                        hookProps={register('serial_number')}
                        error={!!errors.serial_number?.message?.length}
                        errorMessage={errors.serial_number?.message || '&'}
                    />
                </div>
            </div>

            {/* Update Button */}
            <ButtonPrimary
                title="Update"
                name="Update"
                loading={loading}
                className='h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl'
            />

            {/* Close Button */}
            <ButtonPrimary
                type='button'
                title='Close'
                name='Close'
                loading={loading}
                onClick={() => router.back()}
                className='h-12 px-4 py-2 text-lg sm:text-xl lg:text-xl'
            />
        </form>
    );
};

export default Form;
