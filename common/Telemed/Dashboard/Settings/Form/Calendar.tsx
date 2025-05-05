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
import type { ClientComponent, ClientComponentProps } from '@types';
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { SlotParent, SlotParentProps, SlotWrapper } from './types';
import SlotManager from './SlotManager';
import { updateCalendar } from '@service';

const Form: ClientComponentProps<SlotParentProps> = ({
    data,
}) => {
    const [times, setTimes] = useState(timeConstant);
    const [show, setShow] = useState<boolean>(false);
    const [show1, setShow1] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
        minDate: new Date("1950-01-01"),
        datepickerClassNames: "top-12",
        //defaultDate: new Date("2022-01-01"),
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

    const [opp, setOpp] = useState<SlotParent>(data);

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
    return (
        <>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-10'>
                <div className='sm:col-span-3'>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Start Date
                    </label>
                    <div className="mt-2">
                        <Datepicker options={{
                            ...options, inputNameProp: 'start', inputIdProp: 'start', defaultDate: opp.startTime ? new Date(opp.startTime) : undefined,
                        }} onChange={(v) => {
                            setOpp({
                                ...opp,
                                startTime: v
                            })
                        }} show={show} setShow={handleClose} />
                    </div>
                </div>
                <div className='sm:col-span-3'>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        End Date
                    </label>
                    <div className="mt-2">
                        <Datepicker options={{ ...options, inputNameProp: 'end', inputIdProp: 'end', defaultDate: opp.endTime ? new Date(opp.endTime) : undefined, }} onChange={(v) => {
                            setOpp({
                                ...opp,
                                endTime: v
                            })
                        }} show={show1} setShow={handleClose1} />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 2xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-10  gap-6 px-10 align-top text-gray-600">

                    {
                        opp.slots.map((item, index) => {
                            return (
                                <>
                                    <SlotManager
                                        onUpdate={onUpdate}
                                        data={item}
                                    >
                                    </SlotManager></>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <div className="mt-6 flex px-10 items-center justify-end gap-x-6">
                {loading == false && <button
                    type="submit"
                    onClick={async () => {
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
            </div>
        </>
    );
};

export default Form;
