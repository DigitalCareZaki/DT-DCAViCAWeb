import {
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js/max';

const TWILIO_E164_REGEX = /^\+[1-9]\d{1,14}$/;

export const normalizePhoneNumberInput = (value: string) => {
  const trimmed = value.trim();
  const withPlus = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed;
  const digits = withPlus.replace(/\D/g, '');

  return withPlus.startsWith('+') ? `+${digits}` : digits;
};

export const getInternationalPhoneNumberError = (value: string) => {
  const phoneNumber = normalizePhoneNumberInput(value);

  if (!phoneNumber) return 'Phone number is required';

  if (!phoneNumber.startsWith('+')) {
    return 'Phone number must include country code, e.g. +14155552671';
  }

  if (!TWILIO_E164_REGEX.test(phoneNumber)) {
    return phoneNumber.replace(/\D/g, '').length > 15
      ? 'Phone number must be 15 digits or less for Twilio'
      : 'Phone number must use E.164 format, e.g. +14155552671';
  }

  const lengthError = validatePhoneNumberLength(phoneNumber);

  if (lengthError === 'INVALID_COUNTRY') {
    return 'Country calling code is not valid';
  }

  if (lengthError === 'TOO_SHORT') {
    return 'Phone number is too short for this country';
  }

  if (lengthError === 'TOO_LONG') {
    return 'Phone number is too long for this country';
  }

  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);

  if (!parsedPhoneNumber?.isValid()) {
    return 'Phone number is not valid for this country';
  }

  return undefined;
};

export const formatPhoneNumberToE164 = (value: string) =>
  parsePhoneNumberFromString(normalizePhoneNumberInput(value))?.number ??
  normalizePhoneNumberInput(value);
