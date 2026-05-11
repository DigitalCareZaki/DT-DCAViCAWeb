'use server';

import Form from './useForm';

interface Props {
    id: string
}

const EditDepartment = async ({ id }: Props): Promise<JSX.Element> => {
    return (
        <div className="mt-10 flex w-full flex-col gap-6 font-poppins">
            <div className="mt-10 flex w-full justify-center pb-12">
                {/* client form wrapper */}
                <Form id={id} />
            </div>
        </div>
    );
};

export default EditDepartment;

