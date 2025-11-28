'use server';

import { PageInfo } from '@common';

import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { EditAccessoryProps } from './Form/types';

const EditAccessory: ServerComponentProps<EditAccessoryProps> = async ({
    data,
}) => {
    return (
        <div className="mt-10 flex h-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
            <PageInfo />
            <div className="mt-10 flex h-full w-full justify-center pb-40">
                <Form data={data} />
            </div>
        </div>
    );
};

export default EditAccessory;
