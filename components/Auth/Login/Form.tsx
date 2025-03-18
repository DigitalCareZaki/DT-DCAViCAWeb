'use client';

import Link from 'next/link';

import { InputPrimary, ButtonPrimary, InputSelect } from '@common';

import Promotion from '../Promotion';
import useLogin from './useLogin';

export default function Form(): JSX.Element {
  const [register, onSubmit, errors, loading, validator] = useLogin();

  return (
    <form
      onSubmit={onSubmit}
      className="z-10 flex w-[70%] flex-col gap-6 font-poppins"
    >
      <h2 className="text-3xl font-bold text-primary">Login</h2>
      <InputPrimary
        placeholder="Email"
        name="email"
        icon="FaRegUser"
        hookProps={register('email')}
        error={!!errors.email?.message?.length}
        errorMessage={errors.email?.message}
      />

      <InputPrimary
        placeholder="Password"
        type="password"
        icon="FaLock"
        password
        hookProps={register('password')}
        error={!!errors.password?.message?.length}
        errorMessage={errors.password?.message}
        validatorErrors={validator?.getErrors('password')}
      />
      <div className="flex w-full items-center justify-between px-4 text-ssx font-semibold text-secondary">
        <div className="flex items-center gap-2 ">
          <InputSelect />
          <span className="tracking-wider">Remember me</span>
        </div>
        <Link passHref href="/forgot-password">
          <span className="cursor-pointer tracking-wider">
            Forgot Password?
          </span>
        </Link>
      </div>
      {/* SMS Consent Checkbox */}
      <div className="flex items-center px-4 text-ssx text-secondary">
        <div className="flex items-center gap-2 ">
          <InputSelect />
          <span className="tracking-wider text-xs">I consent to receive SMS notifications and updates from Avica, and I can opt out anytime.</span>
        </div>
        {/* <input type="checkbox" className="cursor-pointer" />
        <span className="tracking-wider">
          I consent to receive SMS notifications and updates from Avica, and I can opt out anytime.
        </span> */}
      </div>
      <ButtonPrimary
        name="Login"
        loading={loading}
        className="bg-theme-doctor-primary"
      />
      <Promotion />
    </form>
  );
}
