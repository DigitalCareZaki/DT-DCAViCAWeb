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
  // once true the call leaves the Agora channel and shows that it has ended
  ended: boolean;
  // called when the other side is in the call, which starts the time limit
  onStart: () => void;
}

export interface CounterProps {
  startedAt: number | null;
  ended: boolean;
}

export interface ControlProps {
  id: string;
}
