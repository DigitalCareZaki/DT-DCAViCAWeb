export type DaysProps = {
  onSelect?: (value: Date | undefined) => void;
  selected: Date | undefined;
  startDate : Date | undefined;
  endDate : Date | undefined;
};

interface SelectedDateProps {
  day: Date | undefined;
  timeSlot: {
    startTime: Date | undefined;
    endTime: Date | undefined;
  };
}

interface TimeSlotProps {
  title?: string;
  startTime?: Date;
  endTime?: Date;
  onSelect?: (startTime: Date, endTime: Date) => void;
  selectedTimeSlot?: {
    startTime: Date | undefined;
    endTime: Date | undefined;
  };
}

interface TimeSectionProps {
  title: string;
  Icon: (props: any) => ReactElement;
  description?: string;
  children?: ReactNode;
  showIcon?: boolean;
}
