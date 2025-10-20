'use client';

import { cloneElement, useEffect, useState } from 'react';

import type { ClientComponentProps } from '@types';
import { Slot, SlotProps, SlotWrapper } from './types';
import TimeSlot from './TimeSection';
import { ClientGenerator } from '@common';

const SlotManager: ClientComponentProps<SlotProps> = ({
    data,
    onUpdate,
    startDate,
    endDate,
}) => {

    const convertIntToString = (index: number) => {
        switch (index) {
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                break;
        }

        return "--"
    }
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

    // Keep a local copy of the day's slots but keep it in sync with the
    // incoming `data` prop. Previously this component only read `data` on
    // mount which caused the UI to show stale or empty slots when the
    // parent updated dates or rehydrated data. Use an effect to update the
    // internal state whenever the prop changes.
    const [slotState, setSlotState] = useState<SlotWrapper>(data);

    useEffect(() => {
        // Defensive: ensure data has expected shape
        if (!data) return;
        setSlotState(data);
        // keep slotEnabled consistent with incoming data
        setSlotEnabled(Array.isArray(data.slots) ? data.slots.length > 0 : false);
    }, [data]);

    // Compute a representative date for this weekday within the provided calendar range.
    // If startDate/endDate are provided, prefer the earliest date within the range that
    // matches slotState.day. Otherwise fallback to today.
    function computeBaseDate(): Date {
        const targetWeekday = slotState.day; // 0 = Sunday
        const now = new Date();

        if (startDate && endDate) {
            let cursor = new Date(startDate);
            // normalize time
            cursor.setHours(0, 0, 0, 0);
            const last = new Date(endDate);
            last.setHours(0, 0, 0, 0);

            while (cursor <= last) {
                if (cursor.getDay() === targetWeekday) return new Date(cursor);
                cursor.setDate(cursor.getDate() + 1);
            }
        }

        // fallback: find next date (including today) matching weekday
        const fallback = new Date(now);
        for (let i = 0; i < 7; i++) {
            if (fallback.getDay() === targetWeekday) return fallback;
            fallback.setDate(fallback.getDate() + 1);
        }

        return now;
    }
    const baseDate = computeBaseDate();

    const onAdd = (slot: Slot) => {
        const newSlot = [...slotState.slots, slot];

        console.log("newSlot", newSlot);

        setSlotState({
            ...slotState,
            slots: newSlot
        })

        onUpdate({
            ...slotState,
            slots: newSlot
        });
    }

    const [slotEnabled, setSlotEnabled] = useState<boolean>(Array.isArray(data?.slots) ? data.slots.length > 0 : true);
    const [slotToAdd, setSlotToAdd] = useState<Slot>({
        startTime: undefined,
        endTime: undefined,
    });

    return (
        <>
            <div key={slotState.day} className="flex h-full w-full flex-col justify-start gap-4 col-span-1">
                <div className="mb-6 flex w-full items-center gap-2">
                    <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-fuchsia-500 focus:ring-fuchsia-400"
                        checked={slotEnabled}
                        onChange={() => {
                            if (slotEnabled) {
                                setSlotState({
                                    day: slotState.day,
                                    slots: []
                                })
                                onUpdate({
                                    day: slotState.day,
                                    slots: []
                                });
                            }
                            setSlotEnabled(!slotEnabled);
                        }}
                    ></input>
                    <div className="flex flex-col">
                        <span className="font-semibold">{convertIntToString(slotState.day)}</span>
                        <span className="text-xs font-medium text-gray-400">
                            Active Time
                        </span>
                    </div>
                </div>
                {slotEnabled && <>
                    {
                        slotState.slots.map((item, index) => {
                            return (
                                <TimeSlot
                                    key={`${slotState.day}-${index}`}
                                    setSlot={(s: Slot) => {
                                        const newSlot = [...slotState.slots];
                                        newSlot[index] = s;
                                        setSlotState({
                                            ...slotState,
                                            slots: newSlot
                                        })
                                        onUpdate({
                                            ...slotState,
                                            slots: newSlot
                                        });
                                    }}
                                    slot={item}
                                    baseDate={baseDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    deleteSlot={() => {
                                        const newSlot = [...slotState.slots];
                                        newSlot.splice(index, 1);
                                        setSlotState({
                                            ...slotState,
                                            slots: newSlot
                                        })
                                        onUpdate({
                                            ...slotState,
                                            slots: newSlot
                                        });
                                    }}
                                />
                            )
                        })
                    }
                    <TimeSlot
                        slot={slotToAdd}
                        baseDate={baseDate}
                        startDate={startDate}
                        endDate={endDate}
                        setSlot={(s) => {
                            setSlotToAdd(s);
                        }}
                        onAdded={onAdd}
                    />
                </>}
            </div>
        </>
    );
};

export default SlotManager;
