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
import { useDispatch } from 'react-redux';
import { showModalReducer } from '@slice';

const Form: ClientComponentProps<SlotParentProps> = ({ data }) => {
    const dispatch = useDispatch();
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
        // helper: convert an ISO string saved in UTC (YYYY-MM-DDTHH:mm:00.000Z)
        // into a local Date whose numeric Y/M/D/H/M match the ISO's UTC components.
        // This preserves the original numbers selected by the user when the
        // payload was created using UTC(date components).
        function isoToLocalPreserve(iso?: string | Date | null) {
            if (!iso) return null;
            // accept ISO string or Date object
            const d = typeof iso === 'string' ? new Date(iso) : (iso instanceof Date ? iso : new Date(String(iso)));
            const y = d.getUTCFullYear();
            const mo = d.getUTCMonth();
            const da = d.getUTCDate();
            const hh = d.getUTCHours();
            const mm = d.getUTCMinutes();
            return new Date(y, mo, da, hh, mm, 0, 0);
        }

        // Ensure we have proper data structure
        if (!data || !data.slots || data.slots.length === 0) {
            const defaultSlots = Array.from({ length: 7 }, (_, index) => ({
                day: index,
                slots: []
            }));
            return {
                slots: defaultSlots,
                startTime: isoToLocalPreserve(data?.startTime) || null,
                endTime: isoToLocalPreserve(data?.endTime) || null
            };
        }

        // Convert string dates to Date objects and also convert nested slot times
        const processedData: any = {
            ...data,
            startTime: isoToLocalPreserve(data.startTime) || null,
            endTime: isoToLocalPreserve(data.endTime) || null,
        };

        // convert nested slot times so UI shows the intended hour/minute numbers
        if (processedData.slots && Array.isArray(processedData.slots)) {
            processedData.slots = processedData.slots.map((wrapper: any) => {
                if (!wrapper || !wrapper.slots) return wrapper;
                const slots = wrapper.slots.map((s: any) => {
                    const out: any = { ...s };
                    out.startTime = s.startTime ? isoToLocalPreserve(s.startTime) : undefined;
                    out.endTime = s.endTime ? isoToLocalPreserve(s.endTime) : undefined;
                    return out;
                });
                return { ...wrapper, slots };
            });
        }

        return processedData;
    });

    // Helper to produce a fresh empty weekly slots array
    const createDefaultSlots = () =>
        Array.from({ length: 7 }, (_, index) => ({ day: index, slots: [] }));



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
                            // When user changes the start date, reset the weekly slots
                            setOpp(prev => ({
                                ...prev,
                                startTime: v,
                                slots: createDefaultSlots(),
                            }));
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
                            // When user changes the end date, reset the weekly slots
                            setOpp(prev => ({
                                ...prev,
                                endTime: v,
                                slots: createDefaultSlots(),
                            }));
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
                        <div className="mb-4 px-10">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Weekly Availability
                                {opp.startTime && opp.endTime && (
                                    <span className="ml-2 text-sm text-green-600 font-normal">
                                        ✓ Dates selected - Ready to configure
                                    </span>
                                )}
                            </h3>
                        </div>

                        <div className="grid gap-x-6 gap-y-8 2xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-10 gap-6 align-top text-gray-600">

                            {
                                opp.slots && opp.slots.length > 0 ? (
                                    opp.slots.map((item, index) => {
                                        return (
                                            <SlotManager
                                                key={item.day}
                                                onUpdate={onUpdate}
                                                data={item}
                                                startDate={opp.startTime}
                                                endDate={opp.endTime}
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
                                    dispatch(showModalReducer({
                                        type: 'ERROR',
                                        message: 'Please select both start and end dates',
                                        show: true,
                                    }));
                                    return;
                                }


                                setLoading(true);
                                // create a copy of opp where slot times and top-level
                                // start/end dates are normalized so the calendar date
                                // chosen by the user is preserved when converted to
                                // a UTC ISO string for backend storage.
                                const payload = JSON.parse(JSON.stringify(opp));

                                // normalization helper — takes a Date or date-like value
                                // and returns an ISO string whose UTC components match
                                // the local Y/M/D/H/M of the provided value. This keeps
                                // the numeric date/time the user selected intact.
                                function normalize(dateLike: any) {
                                    if (!dateLike) return dateLike;
                                    const d = new Date(dateLike);
                                    const y = d.getFullYear();
                                    const mo = d.getMonth();
                                    const da = d.getDate();
                                    const hh = d.getHours();
                                    const mm = d.getMinutes();
                                    return new Date(Date.UTC(y, mo, da, hh, mm, 0, 0)).toISOString();
                                }

                                // normalize top-level start/end dates as well
                                payload.startTime = normalize(payload.startTime);
                                payload.endTime = normalize(payload.endTime);

                                // payload.slots -> array of SlotWrapper
                                if (payload.slots && Array.isArray(payload.slots)) {
                                    payload.slots = payload.slots.map((wrapper: any) => {
                                        if (!wrapper || !wrapper.slots) return wrapper;
                                        const slots = wrapper.slots.map((s: any) => {
                                            const out: any = { ...s };

                                            out.startTime = normalize(s.startTime);
                                            out.endTime = normalize(s.endTime);
                                            return out;
                                        });
                                        return { ...wrapper, slots };
                                    });
                                }

                                try {
                                    const res = await updateCalendar(btoa(JSON.stringify(payload)));

                                    if (res.success) {
                                        dispatch(showModalReducer({
                                            type: 'SUCCESS',
                                            message: 'Calendar updated successfully',
                                            show: true,
                                        }));
                                    } else {
                                        dispatch(showModalReducer({
                                            type: 'ERROR',
                                            message: res.message || 'Failed to update calendar',
                                            show: true,
                                        }));
                                    }
                                } catch (error: any) {
                                    console.error('Calendar update error:', error);
                                    dispatch(showModalReducer({
                                        type: 'ERROR',
                                        message: error?.message || 'An error occurred while updating the calendar',
                                        show: true,
                                    }));
                                } finally {
                                    setLoading(false);
                                }
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
