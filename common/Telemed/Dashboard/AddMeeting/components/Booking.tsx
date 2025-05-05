'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { MdWbSunny as MdSunny } from '@react-icons/all-files/md/MdWbSunny';
import { FaCalendarAlt } from '@react-icons/all-files/fa/FaCalendarAlt';
import { IoMoon } from '@react-icons/all-files/io5/IoMoon';
import { RiKnifeLine as PiForkKnifeBold } from '@react-icons/all-files/ri/RiKnifeLine';
import { IoIosCloudyNight } from '@react-icons/all-files/io/IoIosCloudyNight';

import { ClientGenerator } from '@common';

import Days from './Days';
import { times } from './constants';
import TimeSection from './TimeSection';
import TimeSlot from './TimeSlot';

import type { SelectedDateProps } from '../types';
import type { BookingProps } from './types';
import type { ClientComponentProps } from '@types';
import { getCalendar } from 'service';
import { SlotParent, SlotWrapper, Slot } from './../../Settings/Form/types';
import { title } from 'process';

const Booking: ClientComponentProps<BookingProps> = ({ handleSelectDate, selectedUserId }) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>({
    day: undefined,
    timeSlot: {
      startTime: undefined,
      endTime: undefined,
    },
  });

  useEffect(() => {
    if (!selectedUserId) {
      setSlotP(undefined);
      return;
    }

    getCalendar(selectedUserId).then((data) => {
      setSlotP(data.data);
    });
  }, [selectedUserId]);

  const onSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate((prev) => ({ ...prev, day: date }));
  };

  const getSlots = () => {
    // get day of selected.day
    if (!selectedDate.day) return;

    const day = new Date(selectedDate.day).getDay();

    var slot = slotP?.slots.find((el) => el.day === day);

    if (!slot) return;

    return slot.slots;
  }

  const getSlotTimes = (slot: Slot) => {

    var startTime = new Date(slot.startTime!);
    var endTime = new Date(slot.endTime!);

    var startMinutes = startTime!.getMinutes() + startTime!.getHours() * 60;

    var endMinutes = endTime!.getMinutes() + endTime!.getHours() * 60;

    console.log(startMinutes);

    console.log(endMinutes);
    var ret = [];

    for (var i = startMinutes; i <= endMinutes; i += 10) {
      var hours = Math.floor(i / 60);
      var minutes = i % 60;

      var time = `${(hours).toString().padStart(2, '0')}:${(minutes).toString().padStart(2, '0')}`;

      var endMins = i + 10;

      var endHours = Math.floor(endMins / 60);
      var endMinutes2 = endMins % 60;

      // need end time in this format 13:00
      var endTm = `${(endHours).toString().padStart(2, '0')}:${(endMinutes2).toString().padStart(2, '0')}`;

      console.log(endTm);

      const startHours12 = hours % 12 || 12;
      const endHours12 = endHours % 12 || 12;
      const startAmPm = hours >= 12 ? 'PM' : 'AM';
      const endAmPm = endHours >= 12 ? 'PM' : 'AM';
      ret.push({
        startTime: createHours(time + 'am'),
        endTime: createHours(endTm + 'am'),
        title: `${startHours12}:${minutes.toString().padStart(2, '0')} ${startAmPm} - ${endHours12}:${endMinutes2.toString().padStart(2, '0')} ${endAmPm}`,
      });

    }
    console.log("yholo");

    console.log(startMinutes);

    console.log(endMinutes);

    console.log(ret);

    return ret;
  }
  const createHours = (startTime: string): Date => {
    const [time, period] = startTime.split(/(?=[ap]m)/i);
    const [hours, minutes] = time.split(':');

    const date = new Date();
    let hour = parseInt(hours, 10);

    if (period.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }

    date.setHours(hour, parseInt(minutes, 10), 0, 0);
    return date;
  };


  const onSelectTimeSlot = (startTime: Date, endTime: Date) => {
    setSelectedDate((prev) => ({
      ...prev,
      timeSlot: {
        startTime,
        endTime,
      },
    }));

    if (!selectedDate.day) return;

    const startDate = new Date(selectedDate?.day).setHours(
      startTime.getHours(),
      startTime.getMinutes()
    );

    const endDate = new Date(selectedDate?.day).setHours(
      endTime.getHours(),
      endTime.getMinutes()
    );

    handleSelectDate(new Date(startDate), new Date(endDate));
  };

  const [slotP, setSlotP] = useState<SlotParent | undefined>(undefined);

  return (
    <>
      <div className="flex w-full flex-col gap-6 py-10">
        <div className="flex w-full flex-col items-center justify-center gap-10 ">
          {!selectedUserId && <>
            Select Doctor
          </>}
          {
            (!slotP || !slotP.endTime || !slotP.startTime) && selectedUserId && <>
              Slots not available
            </>
          }
          {slotP && slotP.endTime && slotP.startTime &&
            <>

              <div className="flex gap-1 rounded-full bg-fuchsia-500 p-2 px-4 text-xs text-fuchsia-50">
                <span className='text-lg'>
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                  })}
                </span>
                <span className='text-lg'>{new Date().getFullYear()}</span>
              </div>

              <Days
                startDate={new Date(slotP.startTime!)}
                endDate={new Date(slotP.endTime!)}
                onSelect={onSelect} selected={selectedDate.day} />

              {selectedDate?.day !== undefined && (
                <div className="flex w-full items-center justify-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="text-sm font-semibold">
                    {new Date(selectedDate.day).toDateString()}
                  </span>
                </div>
              )}

              <AnimatePresence>
                {selectedDate?.day !== undefined && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      top: -100,
                    }}
                    animate={{
                      opacity: 1,
                      top: 0,
                    }}
                    exit={{
                      opacity: 0,
                      top: -100,
                    }}
                    className="h-full w-full"
                  >
                    <div className="grid-4 grid w-full grid-flow-col gap-6 px-10 align-top text-gray-600">

                      {
                        getSlots()?.map((item, index) => {
                          return <>
                            <div className='grid grid-cols-8 gap-x-1 gap-y-5'>
                              <ClientGenerator
                                data={getSlotTimes(item)}
                                onSelect={onSelectTimeSlot}
                                selectedTimeSlot={selectedDate.timeSlot}
                              >
                                <TimeSlot />
                              </ClientGenerator>
                            </div>
                          </>;
                        })
                      }

                      {/* <TimeSection
                        title="Morning"
                        Icon={IoIosCloudyNight}
                        description="(9 am - 11 am)"
                      >
                        <ClientGenerator
                          data={times.morning}
                          onSelect={onSelectTimeSlot}
                          selectedTimeSlot={selectedDate.timeSlot}
                        >
                          <TimeSlot />
                        </ClientGenerator>
                      </TimeSection>

                      <TimeSection
                        title="Lunch Time"
                        Icon={PiForkKnifeBold}
                        description="(11 am - 2 pm)"
                      >
                        <ClientGenerator
                          data={times.lunch}
                          onSelect={onSelectTimeSlot}
                          selectedTimeSlot={selectedDate.timeSlot}
                        >
                          <TimeSlot />
                        </ClientGenerator>
                      </TimeSection>

                      <TimeSection
                        title="Afternoon"
                        Icon={MdSunny}
                        description="(2 pm - 5 pm)"
                      >
                        <ClientGenerator
                          data={times.afternoon}
                          onSelect={onSelectTimeSlot}
                          selectedTimeSlot={selectedDate.timeSlot}
                        >
                          <TimeSlot />
                        </ClientGenerator>
                      </TimeSection>

                      <TimeSection
                        title="Evening"
                        Icon={IoMoon}
                        description="(5 pm - 7 pm)"
                      >
                        <ClientGenerator
                          data={times.night}
                          onSelect={onSelectTimeSlot}
                          selectedTimeSlot={selectedDate.timeSlot}
                        >
                          <TimeSlot />
                        </ClientGenerator>
                      </TimeSection> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Booking;
