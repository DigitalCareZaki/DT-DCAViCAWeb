'use client';

import { ChangeEvent, useState } from 'react';

import { MdWbSunny as MdSunny } from '@react-icons/all-files/md/MdWbSunny';
import { IoMoon } from '@react-icons/all-files/io5/IoMoon';
import { RiKnifeLine as PiForkKnifeBold } from '@react-icons/all-files/ri/RiKnifeLine';
import { IoIosCloudyNight } from '@react-icons/all-files/io/IoIosCloudyNight';
import { createHours } from '@init-globals';

import { ClientGenerator } from '@common';

import TimeSection from '../../AddMeeting/components/TimeSection';
import TimeSlot from './TimeSection';
import { times as timeConstant } from '../../AddMeeting/components/constants';

import Datepicker from "tailwind-datepicker-react"
import type { ClientComponentProps } from '@types';
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { SlotParent, SlotParentProps, SlotWrapper } from './types';
import SlotManager from './SlotManager';
import { updateCalendar } from '@service';

const Form: ClientComponentProps<SlotParentProps> = ({ data }) => {
    const [times, setTimes] = useState(timeConstant);
    const [show, setShow] = useState<boolean>(false);
    const [show1, setShow1] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ startDate?: string; endDate?: string }>({});

    const [selectedDate, setSelectedDate] = useState<{
        startTime: undefined | Date;
        endTime: undefined | Date;
    }>({
        startTime: undefined,
        endTime: undefined,
    });

    const onSelectTimeSlot = (startTime: Date, endTime: Date) => {

        setSelectedDate((prev) => ({
            startTime,
            endTime,
        }));
    };

    const handleClose = (state: boolean) => {
        setShow(state)
    }
    const handleClose1 = (state: boolean) => {
        setShow1(state)
    }


    const options: IOptions = {
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        minDate: new Date(new Date().setHours(0, 0, 0, 0)), // Set to start of today
        datepickerClassNames: "top-12",
        defaultDate: new Date(new Date().setHours(0, 0, 0, 0)), // Set to start of today
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        },
    }

    // let opp: SlotParent = {
    //     slots: [
    //         {
    //             day: 0,
    //             slots: [],
    //         },
    //         {
    //             day: 1,
    //             slots: [],
    //         },
    //         {
    //             day: 2,
    //             slots: [],
    //         },
    //         {
    //             day: 3,
    //             slots: [],
    //         },
    //         {
    //             day: 4,
    //             slots: [],
    //         },
    //         {
    //             day: 5,
    //             slots: [],
    //         },
    //         {
    //             day: 6,
    //             slots: [],
    //         },
    //     ],
    // }

    const [opp, setOpp] = useState<SlotParent>(() => {
        // Ensure we have proper data structure
        if (!data || !data.slots || data.slots.length === 0) {
            // Initialize with default 7 days if no data
            const defaultSlots = Array.from({ length: 7 }, (_, index) => ({
                day: index,
                slots: []
            }));
            return {
                slots: defaultSlots,
                startTime: data?.startTime || null,
                endTime: data?.endTime || null
            };
        }

        // Convert string dates to Date objects if they exist
        const processedData = {
            ...data,
            startTime: data.startTime ? new Date(data.startTime) : null,
            endTime: data.endTime ? new Date(data.endTime) : null
        };

        console.log('Processed data:', processedData);
        console.log('Original startTime:', data.startTime);
        console.log('Converted startTime:', processedData.startTime);

        return processedData;
    });

    // Debug: Log the data structure
    console.log('Calendar data:', data);
    console.log('Opp state:', opp);
    console.log('Start Time:', opp.startTime, 'Type:', typeof opp.startTime);
    console.log('End Time:', opp.endTime, 'Type:', typeof opp.endTime);
    console.log('Should show weekly days:', !!(opp.startTime && opp.endTime));
    console.log('Should show update button:', !!(opp.startTime && opp.endTime));

    const onUpdate = (data: SlotWrapper) => {
        let temp = [...opp.slots];
        // find the day
        let index = temp.findIndex((item) => item.day === data.day);
        if (index === -1) {
            temp.push(data);
        } else {
            temp[index] = data;
        }

        setOpp({
            ...opp,
            slots: temp,
        });


    }



    const handleChange = (selectedDate: Date) => {
    }

    const handleChangeEnd = (selectedDate: Date) => {
    }

    const validateDates = () => {
        const newErrors: { startDate?: string; endDate?: string } = {};

        if (!opp.startTime) {
            newErrors.startDate = 'Start Date is required';
        }

        if (!opp.endTime) {
            newErrors.endDate = 'End Date is required';
        }

        if (opp.startTime && opp.endTime && opp.startTime >= opp.endTime) {
            newErrors.endDate = 'End Date must be after Start Date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    return (
        <>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-10'>
                <div className='sm:col-span-3'>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                        <Datepicker options={{
                            ...options,
                            inputNameProp: 'start',
                            inputIdProp: 'start',
                            defaultDate: opp.startTime ? new Date(opp.startTime) : undefined,
                        }} onChange={(v) => {
                            setOpp({
                                ...opp,
                                startTime: v
                            });
                            // Clear error when date is selected
                            if (v && errors.startDate) {
                                setErrors(prev => ({ ...prev, startDate: undefined }));
                            }
                        }} show={show} setShow={handleClose} />
                        {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                        )}
                    </div>
                </div>
                <div className='sm:col-span-3'>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        End Date <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                        <Datepicker options={{ ...options, inputNameProp: 'end', inputIdProp: 'end', defaultDate: opp.endTime ? new Date(opp.endTime) : undefined, }} onChange={(v) => {
                            setOpp({
                                ...opp,
                                endTime: v
                            });
                            // Clear error when date is selected
                            if (v && errors.endDate) {
                                setErrors(prev => ({ ...prev, endDate: undefined }));
                            }
                        }} show={show1} setShow={handleClose1} />
                        {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                {(!opp.startTime || !opp.endTime) && (
                    <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> Start Date and End Date are required for the calendar to work properly on the patient side.
                                </p>
                            </div>
                        </div>
                    </div>
                )}


                {/* Weekly Day Selection - Only show when both dates are selected */}
                {(opp.startTime && opp.endTime) && (
                    <>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Weekly Availability
                                {opp.startTime && opp.endTime && (
                                    <span className="ml-2 text-sm text-green-600 font-normal">
                                        ✓ Dates selected - Ready to configure
                                    </span>
                                )}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 2xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-10 gap-6 align-top text-gray-600">

                            {
                                opp.slots && opp.slots.length > 0 ? (
                                    opp.slots.map((item, index) => {
                                        return (
                                            <SlotManager
                                                key={item.day}
                                                onUpdate={onUpdate}
                                                data={item}
                                            />
                                        )
                                    })
                                ) : (
                                    <div className="col-span-full text-center py-8 text-gray-500">
                                        Loading weekly schedule...
                                    </div>
                                )
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="mt-6 flex px-10 items-center justify-end gap-x-6">
                {(opp.startTime && opp.endTime) && (
                    <>
                        {loading == false && <button
                            type="submit"
                            onClick={async () => {
                                // Validate dates before submitting
                                if (!validateDates()) {
                                    return;
                                }

                                setLoading(true);
                                await updateCalendar(
                                    btoa(JSON.stringify(opp))
                                );
                                setLoading(false);
                            }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update
                        </button>}
                        {
                            loading == true && <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        }
                    </>
                )}

            </div>
        </>
    );
};

export default Form;
