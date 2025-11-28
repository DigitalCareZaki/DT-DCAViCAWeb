import type { MeasurementType } from '@types';

export interface TabletProps {
    title: string;
    serial_number: string;
}

export interface EditAccessoryProps {
    data?:
    | (TabletProps & {
        id: string;
        category?: MeasurementType;
    })
    | undefined;
}

export type UseFormProps = [
    any, // register
    any, // onSubmit
    any, // errors
    boolean, // loading
];
