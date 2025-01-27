import { MdAllInclusive } from '@react-icons/all-files/md/MdAllInclusive';
import { RiHeartPulseFill } from '@react-icons/all-files/ri/RiHeartPulseFill';
import { FaCircleNotch } from '@react-icons/all-files/fa/FaCircleNotch';
import { RiDropFill } from '@react-icons/all-files/ri/RiDropFill';
import { RiRulerLine } from '@react-icons/all-files/ri/RiRulerLine';
import { FaTemperatureHigh } from '@react-icons/all-files/fa/FaTemperatureHigh';

export const data = [
  {
    id: 'ALL',
    title: 'All',
    Icon: <MdAllInclusive size={22} />,
  },
  {
    id: 'ECG',
    title: 'ECG',
    Icon: <RiHeartPulseFill size={22} />,
  },
  {
    id: 'SPO2',
    title: 'SpO2',
    Icon: <FaCircleNotch size={22} />,
  },
  {
    id: 'BLOODPRESSURE',
    title: 'Blood Pressure',
    Icon: <RiDropFill size={22} />,
  },
  {
    id: 'BLOODGLUCOSE',
    title: 'Blood Glucose',
    Icon: <RiRulerLine size={22} />,
  },
  {
    id: 'TEMPERATURE',
    title: 'Temperature',
    Icon: <FaTemperatureHigh size={22} />,
  },
];
