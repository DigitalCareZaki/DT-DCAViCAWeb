import { createHours } from '@init-globals';

export const times = {
  morning: [
    {
      title: '09:00 am - 10:00 am',
      startTime: createHours('09:00am'),
      endTime: createHours('10:00am'),
    },
    {
      title: '09:15 am - 10:15 am',
      startTime: createHours('09:15am'),
      endTime: createHours('10:15am'),
    },
    {
      title: '09:30 am - 10:30 am',
      startTime: createHours('09:30am'),
      endTime: createHours('10:30am'),
    },
    {
      title: '09:45 am - 10:45 am',
      startTime: createHours('09:45am'),
      endTime: createHours('10:45am'),
    },
    {
      title: '10:00 am - 11:00 am',
      startTime: createHours('10:00am'),
      endTime: createHours('11:00am'),
    },
  ],
  lunch: [
    {
      title: '12:00 pm - 01:00 pm',
      startTime: createHours('12:00pm'),
      endTime: createHours('01:00pm'),
    },
    {
      title: '12:15 pm - 01:15 pm',
      startTime: createHours('12:15pm'),
      endTime: createHours('01:15pm'),
    },
    {
      title: '12:30 pm - 01:30 pm',
      startTime: createHours('12:30pm'),
      endTime: createHours('01:30pm'),
    },
  ],
  afternoon: [
    {
      title: '02:00 pm - 03:00 pm',
      startTime: createHours('02:00pm'),
      endTime: createHours('03:00pm'),
    },
    {
      title: '02:15 pm - 03:15 pm',
      startTime: createHours('02:15pm'),
      endTime: createHours('03:15pm'),
    },
    {
      title: '02:30 pm - 03:30 pm',
      startTime: createHours('02:30pm'),
      endTime: createHours('03:30pm'),
    },
    {
      title: '04:00 pm - 05:30 pm',
      startTime: createHours('04:00pm'),
      endTime: createHours('05:30pm'),
    },
    {
      title: '04:45 pm - 05:45 pm',
      startTime: createHours('04:45pm'),
      endTime: createHours('05:45pm'),
    },
  ],
  night: [
    {
      title: '05:00 pm - 06:00 pm',
      startTime: createHours('05:00pm'),
      endTime: createHours('06:00pm'),
    },
    {
      title: '05:15 pm - 06:15 pm',
      startTime: createHours('05:15pm'),
      endTime: createHours('06:15pm'),
    },
    {
      title: '05:30 pm - 06:30 pm',
      startTime: createHours('05:30pm'),
      endTime: createHours('06:30pm'),
    },
    {
      title: '05:45 pm - 06:45 pm',
      startTime: createHours('05:45pm'),
      endTime: createHours('06:45pm'),
    },
  ],
};
