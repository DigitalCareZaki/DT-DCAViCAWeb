export interface ParticipantsProps {
  participants: {
    status: string;
    user: {
      first_name: string;
      last_name: string;
      middle_name: string;
      email: string;
      role: string;
    };
  }[];
}
