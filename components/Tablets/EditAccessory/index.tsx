'use server';

import { PageInfo } from '@common';

import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { EditAccessoryProps } from './Form/types';

const EditAccessory: ServerComponentProps<EditAccessoryProps> = async ({
    data,
}) => {
    return (
        <div className="mt-10 flex flex-col gap-6 font-poppins">
            <PageInfo />
            <div className="mt-10 flex w-full justify-center pb-12">
                <Form data={data} />
            </div>
        </div>
    );
};

export default EditAccessory;
