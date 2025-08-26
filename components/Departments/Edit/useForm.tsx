'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import {
    getDepartmentBranches,
    getDepartmentCities,
    updateDepartment,
} from '@service';
import { showModalReducer } from '@slice';
import { useUser } from '@selectors';

import { validator } from '../Create/Form/validator';
import { InputBasic, DropdownSecondary, ClientGenerator, ButtonPrimary } from '@common';
import Branch from '../Create/Form/Branch';
import City from '../Create/Form/City';

import type { DepartmentProps } from '../Create/Form/types';

const EditDepartmentForm = ({ id }: { id: string }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [user] = useUser();

    const [branches, setBranches] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [selectedValues, setSelectedValues] = useState<any>({
        branch: { id: undefined, name: undefined },
        city: { id: undefined, name: undefined },
    });

    // Try to get department data from Redux store
    const departments = useSelector((state: any) => state.departments?.departments || []);
    const currentDepartment = departments.find((dept: any) => dept.id === id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DepartmentProps>({ resolver: vestResolver(validator) });

    const handleSelect = (type: string) => (props: { id: string; name: string }) => {
        if (type === 'branch') {
            setValue('branch_id', props.id);
            clearErrors('branch_id');
        }
        if (type === 'city') {
            setValue('city', props.id);
            clearErrors('city');
        }
        setSelectedValues((prev: any) => ({
            ...prev,
            [type]: { id: props.id, name: props.name },
        }));
    };

    useEffect(() => {
        const run = async () => {
            try {
                const [bs, cs] = await Promise.all([
                    getDepartmentBranches(),
                    getDepartmentCities(),
                ]);

                if (bs.success) setBranches(bs.data as any);
                if (cs.success) setCities(cs.data as any);

                console.log('Branches loaded:', bs.data);
                console.log('Cities loaded:', cs.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        run();
    }, []);

    // Set form values when currentDepartment is available
    useEffect(() => {
        if (currentDepartment) {
            console.log('Setting values from Redux store:', currentDepartment);
            setValue('title', currentDepartment?.title ?? '');
            setValue('description', currentDepartment?.description ?? '');
            setValue('address', currentDepartment?.location?.address ?? currentDepartment?.address ?? '');
            setValue('zipcode', currentDepartment?.location?.zipcode ?? currentDepartment?.zipcode ?? '');
            setValue('branch_id', currentDepartment?.branch?.id ?? currentDepartment?.branch_id ?? '');
            setValue('city', currentDepartment?.location?.city?.id ?? currentDepartment?.city_id ?? '');

            setSelectedValues({
                branch: {
                    id: currentDepartment?.branch?.id ?? currentDepartment?.branch_id,
                    name: currentDepartment?.branch?.name
                },
                city: {
                    id: currentDepartment?.location?.city?.id ?? currentDepartment?.city_id,
                    name: currentDepartment?.location?.city?.name
                },
            });
        }
    }, [currentDepartment, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        const payload = {
            title: data.title,
            description: data.description,
            address: data.address,
            zipcode: data.zipcode,
            city_id: data.city,
            branch_id: data.branch_id,
        };

        const res = await updateDepartment(id, btoa(JSON.stringify(payload)));
        if (res.success) {
            dispatch(
                showModalReducer({ type: 'SUCCESS', message: 'Updated', show: true })
            );
            router.push(`/${user.role?.toLowerCase()}/departments`);
        } else {
            dispatch(
                showModalReducer({ type: 'ERROR', message: 'Failed to update', show: true })
            );
        }
    });

    return (
        <form onSubmit={onSubmit} className="flex w-full h-fit max-w-4xl flex-col gap-5 rounded-2xl bg-white p-6 mx-auto">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                <div className="w-full sm:w-1/2">
                    <InputBasic
                        title="Department or Speciality"
                        label="Department/Speciality"
                        placeholder="Enter department or speciality name"
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
                        title="Department description"
                        label="About"
                        placeholder="Enter department description"
                        icon="SiNamecheap"
                        borderTheme
                        inputWrapperClassName="bg-background"
                        inputClassName="bg-background"
                        hookProps={register('description')}
                        error={!!errors.description?.message?.length}
                        errorMessage={errors.description?.message || '&'}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                <div className="w-full sm:w-1/2">
                    <InputBasic
                        title="Department Address"
                        label="Address"
                        placeholder="Enter where this department located"
                        icon="FaLocationDot"
                        borderTheme
                        inputWrapperClassName="bg-background"
                        inputClassName="bg-background"
                        hookProps={register('address')}
                        error={!!errors.address?.message?.length}
                        errorMessage={errors.address?.message || '&'}
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <InputBasic
                        title="Department Zipcode"
                        label="Zipcode"
                        placeholder="Enter department zipcode"
                        icon="FaLocationDot"
                        borderTheme
                        inputWrapperClassName="bg-background"
                        inputClassName="bg-background"
                        hookProps={register('zipcode')}
                        error={!!errors.zipcode?.message?.length}
                        errorMessage={errors.zipcode?.message || '&'}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
                <div className="w-full sm:w-1/2">
                    <DropdownSecondary
                        title="Select Department Branch"
                        label="Select Branch"
                        borderTheme
                        inputWrapperClassName="bg-background"
                        icon="MdPin"
                        error={!!errors.branch_id?.message?.length}
                        errorMessage={errors.branch_id?.message || '&'}
                        selected={selectedValues?.branch?.name}
                    >
                        <ClientGenerator data={branches} handleSelect={handleSelect}>
                            <Branch />
                        </ClientGenerator>
                    </DropdownSecondary>
                </div>
                <div className="w-full sm:w-1/2">
                    <DropdownSecondary
                        title="Select Department City"
                        label="Select City"
                        borderTheme
                        inputWrapperClassName="bg-background"
                        icon="MdPin"
                        error={!!errors.city?.message?.length}
                        errorMessage={errors.city?.message || '&'}
                        selected={selectedValues?.city?.name}
                    >
                        <ClientGenerator data={cities} handleSelect={handleSelect}>
                            <City />
                        </ClientGenerator>
                    </DropdownSecondary>
                </div>
            </div>

            <ButtonPrimary title="Save" name="Save" />
        </form>
    );
};

export default EditDepartmentForm;

