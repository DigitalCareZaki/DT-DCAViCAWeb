import { ChangeEvent } from 'react';

export interface TimeSectionProps {
  title?: string;
  onAdded?: (slot: Slot) => void;
  min?: string;
  max?: string;
  slot: useState<Slot | undefined>;
  setSlot: (slot: Slot) => void;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    index: number
  ) => void;
  index?: number;
  deleteSlot?: () => void;
}

export interface SlotProps {
  data: SlotWrapper;
  onUpdate: (data: SlotWrapper) => void;
}

export interface SlotParentProps {
  data: SlotParent;
}

export interface SlotParent {
  slots: SlotWrapper[];
  startTime?: Date | null;
  endTime?: Date | null;
}

export interface SlotWrapper {
  day: number;
  slots: Slot[];
}

export interface Slot {
  startTime?: Date;
  endTime?: Date;
}
