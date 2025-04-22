import { create, test, enforce } from 'vest';

export const telemedReportValidator = create((data = {}) => {
    test('observations', 'Observations are required', () => {
        enforce(data.observations).isNotBlank();
    });

    test('diagnosis', 'Diagnosis is required', () => {
        enforce(data.diagnosis).isNotBlank();
    });

    test('prescribedMedications', 'Prescribed Medications are required', () => {
        enforce(data.prescribedMedications).isNotBlank();
    });

    test('procedureRecommended', 'Procedure Recommended is required', () => {
        enforce(data.procedureRecommended).isNotBlank();
    });

    test('followupDate', 'Follow Up Date is required', () => {
        enforce(data.followupDate).isNotEmpty();
    });

    test('followupDate', 'Follow Up Date must be a valid date', () => {
        enforce(new Date(data.followupDate).toString()).notEquals('Invalid Date');
    });
});
