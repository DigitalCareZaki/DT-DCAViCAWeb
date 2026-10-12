import { create, test, enforce, omitWhen } from 'vest';

// Only observations and diagnosis are required; the other fields are optional
export const telemedReportValidator = create((data = {}) => {
    test('observations', 'Observations are required', () => {
        enforce(data.observations).isNotBlank();
    });

    test('diagnosis', 'Diagnosis is required', () => {
        enforce(data.diagnosis).isNotBlank();
    });

    omitWhen(!data.followupDate, () => {
        test('followupDate', 'Follow Up Date must be a valid date', () => {
            enforce(new Date(data.followupDate).toString()).notEquals('Invalid Date');
        });
    });
});
