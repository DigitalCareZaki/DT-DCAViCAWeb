import React from 'react';

const mainStyle = {
    transform: 'scale(0.67)',
    transformOrigin: 'top left',
    width: '150%',
    height: '150%',
    overflow: 'hidden',
};

const PatientLoader: React.FC = () => (
    <div
        style={mainStyle}
        className="flex h-full w-screen items-center justify-center bg-background"
    >
        <div
            className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    </div>
);

export default PatientLoader; 