import { create, test, enforce, mode, Modes, only } from 'vest';
export const validator = create((data: any) => {
    mode(Modes.ALL);
    test('observations', 'Observations is required', () => {
        enforce(data.observations).isNotEmpty();
    });
    test('diagnosis', 'Diagnosis is required', () => {
        enforce(data.diagnosis).isNotEmpty();
    });
    test('procedureRem', 'Procedure Recommended is required', () => {
        enforce(data.procedureRem).isNotEmpty();
    });
    test('followUpDate', 'Follow Up Date is required', () => {
        enforce(data.followUpDate).isNotEmpty();
    });
});