'use client';

import { MdCheck } from '@react-icons/all-files/md/MdCheck';

import { InputPrimary, ButtonPrimary, InputBasic } from '@common';
import { resetPasswordRequest, resetPassword } from '@service';

import Promotion from '../Promotion';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'step-1' | 'step-2' | 'step-3'>('step-1');
  const [values, setValues] = useState({
    value: '',
    otp: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const handleInitStep = async () => {
    if (!values.value?.trim()?.length)
      throw new Error('Please define username or email');

    const res = await resetPasswordRequest(
      btoa(
        JSON.stringify({
          value: values.value,
        })
      )
    );

    if (!res.success) throw new Error(res.message);

    setStep('step-2');
  };

  const handleResetPassword = async () => {
    if (!values.otp?.trim()?.length) {
      throw new Error('Please enter otp');
    }

    if (!values.password?.trim()?.length) {
      throw new Error('Please enter your password');
    }

    const res = await resetPassword(
      btoa(
        JSON.stringify({
          otp: values.otp,
          password: values.password,
          email: values.value,
        })
      )
    );

    if (!res.success) {
      setError(res?.message);
      return;
    }

    setStep('step-3');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (step === 'step-1') return await handleInitStep();
      if (step === 'step-2') return await handleResetPassword();
      if (step === 'step-3') {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const Render = {
    'step-1': (
      <InputPrimary
        placeholder={'Username/Email'}
        name="email"
        icon="FaRegUser"
        onChange={handleChange('value')}
        value={values.value}
      />
    ),
    'step-2': (
      <>
        <InputBasic
          placeholder="Enter one time password (OTP) from your email"
          name="otp"
          icon="FaLock"
          onChange={handleChange('otp')}
          value={values.otp}
          label="One time password"
          borderTheme
        />
        <InputBasic
          placeholder="Password"
          type="password"
          icon="FaLock"
          password
          label="Password"
          borderTheme
          onChange={handleChange('password')}
          value={values.password}
        />
      </>
    ),
    'step-3': (
      <>
        <div className="my-10 flex w-full flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
            <MdCheck size={30} />
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Password updated successfully
          </span>
        </div>
      </>
    ),
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-[90%] flex-col items-center gap-6 font-poppins sm:w-[70%]"
    >
      <h2 className="text-2xl font-bold text-primary">
        {step === 'step-1' ? 'Forgot your password?' : 'Reset your password'}
      </h2>
      {/* <span className="-my-4 text-xs font-semibold text-gray-500">
        {"We've"} sent you an OTP please check your inbox or junk
      </span> */}
      {Render[step]}
      <div className="-my-4 flex w-full justify-start">
        <span className="text-xs font-normal text-red-500">{error}</span>
      </div>
      <div className="flex w-full items-center gap-4">
        <ButtonPrimary
          name={step === 'step-3' ? 'Login' : 'Submit'}
          style={{
            backgroundColor: '#0070FA',
          }}
          type="submit"
          loading={loading}
        />
      </div>
      <Promotion />
    </form>
  );
}
