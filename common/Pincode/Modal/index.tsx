import React from 'react';
import { InputBasic, ButtonPrimary } from '@common';
import useForm from '../Form/useForm';


const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [register, onSubmit, errors, loading] = useForm();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 rounded-lg bg-white">
                {/* <h2 className="text-lg font-bold">Modal Title</h2> */}
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
                    className="flex h-fit w-[100%] flex-col gap-5 rounded-2xl bg-white p-6"
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
            </div>
        </div>
    );
};

export default Modal;