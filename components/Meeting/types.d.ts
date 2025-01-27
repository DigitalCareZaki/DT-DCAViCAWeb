export type UserSecondaryProps = {
  src: string;
  name: string;
  speaking?: boolean;
  video?: boolean;
};

export interface MeetingProps {
  id: string;
}

export interface TopbarProps {
  id: string;
}

export interface ParticipantsProps {
  id: string;
}

export interface AgoraCallProps {
  id: string;
}

export interface ControlProps {
  id: string;
}
