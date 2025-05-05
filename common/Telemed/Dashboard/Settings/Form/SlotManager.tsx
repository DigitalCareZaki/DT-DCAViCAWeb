'use client';

import { cloneElement, useState } from 'react';

import type { ClientComponentProps } from '@types';
import { Slot, SlotProps, SlotWrapper } from './types';
import TimeSlot from './TimeSection';
import { ClientGenerator } from '@common';

const SlotManager: ClientComponentProps<SlotProps> = ({
    data,
    onUpdate,
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

    const [slotState, setSlotState] = useState<SlotWrapper>(data);

    const onAdd = (slot: Slot) => {
        const newSlot = [...slotState.slots, slot];
        setSlotState({
            ...slotState,
            slots: newSlot
        })

        onUpdate({
            ...slotState,
            slots: newSlot
        });
    }

    const [slotEnabled, setSlotEnabled] = useState<boolean>(true);
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
                            return <>
                                <TimeSlot setSlot={
                                    (slot: Slot) => {
                                        const newSlot = [...slotState.slots];
                                        newSlot[index] = slot;
                                        setSlotState({
                                            ...slotState,
                                            slots: newSlot
                                        })
                                        onUpdate({
                                            ...slotState,
                                            slots: newSlot
                                        });

                                        console.log("updated");

                                    }
                                } slot={item}
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
                                    }
                                    }
                                ></TimeSlot>
                            </>
                        })
                    }
                    <TimeSlot
                        slot={slotToAdd}
                        setSlot={(s) => {
                            setSlotToAdd(s);
                        }}
                        onAdded={onAdd}></TimeSlot>
                </>}
            </div>
        </>
    );
};

export default SlotManager;
