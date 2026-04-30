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
import { getCalendar, getSelectDoctorSlots } from 'service';
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
  const [currentSlots, setCurrentSlots] = useState<Slot[] | undefined>(undefined);

  function isoToLocalPreserve(iso?: string | Date | null) {
    if (!iso) return null;
    const d = typeof iso === 'string' ? new Date(iso) : (iso instanceof Date ? iso : new Date(String(iso)));
    const y = d.getUTCFullYear();
    const mo = d.getUTCMonth();
    const da = d.getUTCDate();
    const hh = d.getUTCHours();
    const mm = d.getUTCMinutes();
    return new Date(y, mo, da, hh, mm, 0, 0);
  }

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
      // convert API ISO datetimes (UTC) into local Date objects that preserve
      // the original numeric date/time components (year, month, day, hour, min)
      // This avoids browser timezone conversion showing +offset hours.

      console.log('getCalendar data >>>>', data);

      const incoming = data.data;
      if (incoming) {
        const processed: any = { ...incoming };
        processed.startTime = isoToLocalPreserve(incoming.startTime) || null;
        processed.endTime = isoToLocalPreserve(incoming.endTime) || null;

        if (processed.slots && Array.isArray(processed.slots)) {
          processed.slots = processed.slots.map((wrapper: any) => {
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

        setSlotP(processed as SlotParent);

        // Set initial selectedMonth to the first available month
        if (processed?.startTime) {
          const firstMonth = new Date(processed.startTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          setSelectedMonth(firstMonth);
        }
      } else {
        setSlotP(data.data);
        setSelectedMonth(''); // Reset month if no data
      }
    });
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedDate.day && selectedUserId) {
      const date = new Date(selectedDate.day);
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - (offset * 60 * 1000));
      const dateString = localDate.toISOString().split('T')[0];

      getSelectDoctorSlots(selectedUserId, dateString).then((res) => {
        if (res.success && res.data && res.data.slots) {
          const slots = res.data.slots.map((s: any) => {
            const out: any = { ...s };
            out.startTime = s.startTime ? isoToLocalPreserve(s.startTime) : undefined;
            out.endTime = s.endTime ? isoToLocalPreserve(s.endTime) : undefined;
            return out;
          });
          setCurrentSlots(slots);
        } else {
          setCurrentSlots([]);
        }
      });
    }
  }, [selectedDate.day, selectedUserId]);

  // Get available months from startTime to endTime
  const getAvailableMonths = () => {
    if (!slotP?.startTime || !slotP?.endTime) return [];

    const months: { label: string; year: number; month: number }[] = [];
    const currentDate = new Date(slotP.startTime);
    const endDate = new Date(slotP.endTime);

    // First, add the starting month
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    months.push({ label: monthLabel, year, month });

    // Then loop through each subsequent month until we reach or pass endDate
    while (true) {
      // Move to the first day of the next month
      currentDate.setDate(1);
      currentDate.setMonth(currentDate.getMonth() + 1);

      // If we've gone past the end date, stop
      if (currentDate > endDate) {
        break;
      }

      year = currentDate.getFullYear();
      month = currentDate.getMonth();
      monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      // Check if this month is already in the list (shouldn't happen, but just in case)
      if (!months.some(m => m.year === year && m.month === month)) {
        months.push({ label: monthLabel, year, month });
      }
    }

    return months.map(m => m.label);
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

    return currentSlots;
  }

  const getSlotTimes = (slot: Slot) => {
    const startTime = new Date(slot.startTime!);
    const endTime = new Date(slot.endTime!);

    const format = (d: Date) =>
      d
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .toUpperCase();

    return [
      {
        startTime,
        endTime,
        title: `${format(startTime)} - ${format(endTime)}`,
      },
    ];
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
                    <div className="flex w-full flex-wrap gap-4 px-10 text-gray-600">

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
