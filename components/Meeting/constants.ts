// longest a teleconsultation call may run before it is ended automatically
export const MAX_MEETING_MINUTES = 20;
export const MAX_MEETING_MS = MAX_MEETING_MINUTES * 60 * 1000;

// how long before the end both sides are warned that the call is about to close
export const MEETING_WARNING_MS = 2 * 60 * 1000;
