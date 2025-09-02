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

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [slotP, setSlotP] = useState<SlotParent | undefined>(undefined);

  useEffect(() => {

    // Check if API calls are temporarily disabled
    if ((window as any).__PREVENT_API_CALLS__) {
      return;
    }

    if (!selectedUserId) {
      setSlotP(undefined);
      return;
    }

    getCalendar(selectedUserId).then((data) => {
      setSlotP(data.data);
      // Set the first month as default selected month
      if (data.data?.startTime) {
        const firstMonth = new Date(data.data.startTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        setSelectedMonth(firstMonth);
      }
    });
  }, [selectedUserId]);

  // Get available months from startTime to endTime
  const getAvailableMonths = () => {
    if (!slotP?.startTime || !slotP?.endTime) return [];

    const months: string[] = [];
    const currentDate = new Date(slotP.startTime);
    const endDate = new Date(slotP.endTime);

    while (currentDate <= endDate) {
      const monthKey = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!months.includes(monthKey)) {
        months.push(monthKey);
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  };

  // Filter days to show only selected month
  const getFilteredDays = () => {
    if (!selectedMonth || !slotP?.startTime || !slotP?.endTime) return [];

    const startDate = new Date(slotP.startTime);
    const endDate = new Date(slotP.endTime);
    const dates: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const monthKey = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (monthKey === selectedMonth) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const onSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate((prev) => ({ ...prev, day: date }));
  };

  const onSelectMonth = (month: string) => {
    setSelectedMonth(month);
    // Don't reset selected date when month changes - preserve user selections
    // setSelectedDate((prev) => ({ ...prev, day: undefined }));
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

  return (
    <>
      <div className="flex w-full flex-col gap-6 py-10">
        <div className="flex w-full flex-col items-center justify-center gap-10 ">
          {!selectedUserId && <>
            Select Date & Time Slot
          </>}
          {
            (!slotP || !slotP.endTime || !slotP.startTime) && selectedUserId && <>
              Slots not available
            </>
          }
          {slotP && slotP.endTime && slotP.startTime &&
            <>
              {/* Month Selector */}
              <div className="flex w-full flex-col items-center gap-4 mb-6">
                <div className="text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
                  💡 Select a month to view dates, then choose any date from any month for your appointment
                </div>
                <div className="flex gap-4">
                  {getAvailableMonths().map((month) => (
                    <div
                      key={month}
                      onClick={() => onSelectMonth(month)}
                      className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${selectedMonth === month
                        ? 'bg-emerald-500 text-white shadow-lg scale-105'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:scale-105'
                        }`}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="flex gap-1 rounded-full bg-emerald-500 p-2 px-4 text-xs text-fuchsia-50">
                <span className='text-lg'>
                  {selectedMonth || new Date().toLocaleDateString('en-US', { month: 'long' })}
                </span>
                <span className='text-lg'>{new Date().getFullYear()}</span>
              </div> */}

              {/* Show message if selected date is from different month */}
              {selectedDate?.day && selectedMonth && (
                (() => {
                  const selectedDateMonth = new Date(selectedDate.day).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  if (selectedDateMonth !== selectedMonth) {
                    return (
                      <div className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                        📅 Currently viewing {selectedMonth}, but you have a date selected from {selectedDateMonth}
                      </div>
                    );
                  }
                  return null;
                })()
              )}

              <Days
                startDate={new Date(slotP.startTime!)}
                endDate={new Date(slotP.endTime!)}
                onSelect={onSelect}
                selected={selectedDate.day}
                selectedMonth={selectedMonth}
                filteredDays={getFilteredDays()}
              />

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
                    <div className="flex w-full flex-col gap-6 px-10 text-gray-600">

                      {
                        getSlots()?.map((item, index) => {
                          return (
                            <div key={index} className='flex flex-wrap gap-2'>
                              <ClientGenerator
                                data={getSlotTimes(item)}
                                onSelect={onSelectTimeSlot}
                                selectedTimeSlot={selectedDate.timeSlot}
                              >
                                <TimeSlot />
                              </ClientGenerator>
                            </div>
                          );
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
