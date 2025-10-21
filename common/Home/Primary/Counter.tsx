'use client';

import { PrimaryCounter } from '@common';

import type { ClientComponentProps, AppointmentStats } from '@types';

const Counter = ({
  title,
  value,
}: {
  title: string;
  value: number;
}): JSX.Element => {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-tl p-4 
      superadmin:from-theme-superadmin-primary superadmin:to-green-600 
      admin:from-theme-admin-primary admin:to-indigo-500 
      doctor:from-theme-doctor-primary doctor:to-blue-400 
      patient:from-theme-patient-primary patient:to-red-400 
      nurse:from-theme-nurse-primary nurse:to-yellow-400"
    >
      <span className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
        <PrimaryCounter value={value} prefix="" />
      </span>
      <span className="text-xs uppercase tracking-wide text-white md:text-sm lg:text-base">
        {title}
      </span>
    </div>
  );
};

const RenderCounter: ClientComponentProps<{
  ongoing?: number;
  active?: number;
  pending?: number;
  tomorrowOngoing?: number;
  tomorrowActive?: number;
  tomorrowPending?: number;
}> = ({ ongoing, active, pending, tomorrowOngoing, tomorrowActive, tomorrowPending }) => {
  const scheduledForToday = (ongoing || 0) + (active || 0) + (pending || 0);
  const scheduledForTomorrow = (tomorrowOngoing || 0) + (tomorrowActive || 0) + (tomorrowPending || 0);

  return (
    <div className="flex h-full w-full flex-col gap-4 p-2 md:flex-row md:gap-2 md:p-4">
      <Counter title="Scheduled for today" value={scheduledForToday} />
      <Counter title="Scheduled for tomorrow" value={scheduledForTomorrow} />
    </div>
  );
};

export default RenderCounter;

// old code

// 'use client';

// import { PrimaryCounter } from '@common';

// import type { ClientComponentProps, AppointmentStats } from '@types';

// const Counter = ({
//   title,
//   value,
// }: {
//   title: string;
//   value: number;
// }): JSX.Element => {
//   return (
//     <div
//       className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-tl p-4
//       superadmin:from-theme-superadmin-primary superadmin:to-green-600
//       admin:from-theme-admin-primary admin:to-indigo-500
//       doctor:from-theme-doctor-primary doctor:to-blue-400
//       patient:from-theme-patient-primary patient:to-red-400
//       nurse:from-theme-nurse-primary nurse:to-yellow-400"
//     >
//       <span className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
//         <PrimaryCounter value={value} prefix="" />
//       </span>
//       <span className="text-xs uppercase tracking-wide text-white md:text-sm lg:text-base">
//         {title}
//       </span>
//     </div>
//   );
// };

// const RenderCounter: ClientComponentProps<AppointmentStats> = ({
//   hold, cancelled, ongoing, active, completed, pending
// }) => {
//   return (
//     <div className="flex h-full w-full flex-col gap-4 p-2 md:flex-row md:gap-2 md:p-4">
//       <Counter title="Hold" value={hold} />
//       <Counter title="Cancelled" value={cancelled} />
//       <Counter title="ongoing" value={ongoing} />
//       <Counter title="Active" value={active} />
//       <Counter title="Completed" value={completed} />
//       <Counter title="Pending" value={pending} />
//     </div>
//   );
// };

// export default RenderCounter;
