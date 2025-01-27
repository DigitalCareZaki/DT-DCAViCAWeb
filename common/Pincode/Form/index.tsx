'use client';

import { ButtonPrimary, InputBasic } from '@common';
import useForm from './useForm';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [register, onSubmit, errors, loading] = useForm();

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-[30%] flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <InputBasic
        title="Password enter your current password"
        label="Password"
        placeholder="Enter your current password"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('password')}
        error={!!errors.password?.message}
        errorMessage={errors.password?.message || '&'}
        type="password"
      />
      <InputBasic
        title="Set or change your pincode to improve your security"
        label="Pincode"
        placeholder="Set your pincode"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('pincode')}
        error={!!errors.pincode?.message}
        errorMessage={errors.pincode?.message || '&'}
        type="password"
      />
      <ButtonPrimary name="Save" loading={loading} />
    </form>
  );
};

export default Form;
