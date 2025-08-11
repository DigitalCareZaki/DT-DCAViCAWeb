'use client';

import { InputSelect, InputBasic, ButtonPrimary } from '@common';

import useForm from './useForm';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [
    register,
    onSubmit,
    errors,
    loading,
    watch,
    handleClick,
    handleCancel,
  ] = useForm();

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-2 font-poppins"
      >
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-3 text-xs">
            <InputSelect
              onClick={() => handleClick('forgot_password')}
              {...register('forgot_password')}
              value={watch('forgot_password')}
            />
            <span>Forgot my password</span>
          </div>
          <div className="flex w-full items-center gap-3 text-xs">
            <InputSelect
              onClick={() => handleClick('not_signing_up')}
              {...register('not_signing_up')}
              value={watch('not_signing_up')}
            />
            <span>Everything fine but not signing in/up</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-3 text-xs">
            <InputSelect
              onClick={() => handleClick('can_not_find_anything')}
              {...register('can_not_find_anything')}
              value={watch('can_not_find_anything')}
            />
            <span>Cannot find anything</span>
          </div>
          <div className="flex w-full items-center gap-3 text-xs">
            <InputSelect
              onClick={() => handleClick('showing_errors')}
              {...register('showing_errors')}
              value={watch('showing_errors')}
            />
            <span>Showing errors</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-3 text-xs">
            <InputSelect
              onClick={() => handleClick('others')}
              {...register('others')}
              value={watch('others')}
            />
            <span>Other</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full">
            <InputBasic
              label="Email"
              placeholder="Enter your email address"
              borderTheme
              labelVariant="tiny"
              title="Email"
              defaultBorder
              hookProps={register('email')}
              error={!!errors.email?.message?.length}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="w-full">
            <textarea
              rows={5}
              className="w-full rounded-lg p-4 text-md outline-none"
              placeholder="Write your issue"
              {...register('textarea')}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3">
          <ButtonPrimary
            name="Submit"
            className="h-10 rounded-lg bg-primary text-white"
            loading={loading}
          />
          <ButtonPrimary
            name="Cancel"
            className="h-10 rounded-lg border bg-transparent text-gray-600"
            onClick={handleCancel}
            type="button"
            outlined
          />
        </div>
      </form>
    </>
  );
};

export default Form;
