import React from 'react';
import { InputPrimary, ButtonPrimary } from '@common';
import useForm from '../useForm';


const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [register, onSubmit, errors, loading, validator] = useForm();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 rounded-lg bg-white">
                {/* <h2 className="text-lg font-bold">Change Password</h2> */}
                {/* <p>Meeting ID: {id}</p> */}

                <div className="rounded-xl bg-white p-4 relative">
                    {/* Cancel Icon */}
                    <button
                        onClick={onClose} // Call the close function when clicked
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
                    method="PATCH"
                    className="flex h-fit w-[100%] flex-col gap-5 rounded-2xl bg-white p-6"
                // className="flex h-full w-full flex-col items-center overflow-y-scroll pb-96"
                >
                    <div className="flex w-full flex-col">
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
            </div>
        </div>
    );
};

export default Modal;