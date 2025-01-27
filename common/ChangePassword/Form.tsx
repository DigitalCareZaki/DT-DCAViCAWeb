'use client';

import { InputPrimary, ButtonPrimary } from '@common';

import useForm from './useForm';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [register, onSubmit, errors, loading, validator] = useForm();

  return (
    <form
      onSubmit={onSubmit}
      method="PATCH"
      className="flex h-full w-full flex-col items-center overflow-y-scroll pb-96"
    >
      <div className="flex w-[45rem] flex-col">
        <div className="w-full">
          <InputPrimary
            placeholder="New Password"
            type="password"
            icon="FaLock"
            borderTheme
            password
            hookProps={register('password')}
            error={!!errors?.password?.message?.length}
            errorMessage={errors?.password?.message}
            validatorErrors={validator?.getErrors('password')}
          />
        </div>
        <div className="mt-5 w-full">
          <InputPrimary
            placeholder="Repeat Password"
            type="password"
            icon="FaLock"
            borderTheme
            password
            hookProps={register('repeatPassword')}
            error={!!errors?.repeatPassword?.message?.length}
            errorMessage={errors?.repeatPassword?.message}
            validatorErrors={validator?.getErrors('repeatPassword')}
          />
        </div>
        <div className="mt-10 w-full">
          <ButtonPrimary name="Change Password" loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default Form;
