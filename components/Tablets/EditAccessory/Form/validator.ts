import { create, test, enforce, only } from 'vest';

import type { TabletProps } from './types';

const validator = create((data: TabletProps) => {
    test('title', 'Title is required', () => {
        enforce(data.title).isNotEmpty();
    });

    test('serial_number', 'Serial number is required', () => {
        enforce(data.serial_number).isNotEmpty();
    });
});

export { validator };
