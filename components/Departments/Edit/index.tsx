'use server';

import Form from './useForm';

import type { ServerComponent } from '@types';

interface Props { id: string }

const EditDepartment: ServerComponent<any> = async ({ id }: any) => {
    return (
        <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
            <div className="mt-10 flex h-full w-full justify-center pb-40">
                {/* client form wrapper */}
                <Form id={id} />
            </div>
        </div>
    );
};

export default EditDepartment;

