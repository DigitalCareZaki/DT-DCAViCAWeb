export interface BookingProps {
  handleSelectDate: (startDate: Date, endDate: Date) => void;
  selectedUserId: string|undefined;
}
