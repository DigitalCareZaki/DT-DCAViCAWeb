import { ChangeEvent } from 'react';

export interface TimeSectionProps {
  title?: string;
  onAdded?: (slot: Slot) => void;
  min?: string;
  max?: string;
  // the slot data currently being edited/added
  slot?: Slot;
  setSlot: (slot: Slot) => void;
  // when provided, TimeSection will use this date as the base (day/month/year)
  // for newly selected times. This prevents falling back to the current date.
  baseDate?: Date;
  // optional parent calendar boundaries so TimeSection can validate
  // selected times do not fall outside the configured range
  startDate?: Date | null;
  endDate?: Date | null;
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
  // parent calendar range (optional) so SlotManager can compute the exact
  // date for a weekday when creating new slots
  startDate?: Date | null;
  endDate?: Date | null;
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
