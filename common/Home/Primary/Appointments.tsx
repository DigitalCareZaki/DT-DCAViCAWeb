'use client';

import RenderCounter from './Counter';

import type { ClientComponentProps, AppointmentStats } from '@types';


interface AppointmentProps {
  appointments: AppointmentStats
}

const AppointmentsCard: ClientComponentProps<AppointmentProps> = ({
  appointments
}) => {
  return (
    <div className="flex h-auto w-full flex-col rounded-2xl border bg-white p-4 doctor:border-theme-doctor-primary nurse:border-theme-nurse-primary md:h-52 md:p-6">
      <div className="w-full text-center">
        <span className="theme-text-color text-sm font-semibold uppercase tracking-wide md:text-xs lg:text-sm">
          Appointments
        </span>
      </div>
      <RenderCounter
        ongoing={appointments.ongoing}
        active={appointments.active}
        pending={appointments.pending}
      />
    </div>
  );
};

export default AppointmentsCard;

// old code
// 'use client';

// import RenderCounter from './Counter';

// import type { ClientComponentProps, AppointmentStats } from '@types';


// interface AppointmentProps {
//   appointments: AppointmentStats
// }

// const AppointmentsCard: ClientComponentProps<AppointmentProps> = ({
//   appointments
// }) => {
//   return (
//     <div className="flex h-auto w-full flex-col rounded-2xl border bg-white p-4 doctor:border-theme-doctor-primary nurse:border-theme-nurse-primary md:h-52 md:p-6">
//       <div className="w-full text-center">
//         <span className="theme-text-color text-sm font-semibold uppercase tracking-wide md:text-xs lg:text-sm">
//           Appointments - Today
//         </span>
//       </div>
//       <RenderCounter hold={appointments.hold} cancelled={appointments.cancelled} ongoing={appointments.ongoing} active={appointments.active} completed={appointments.completed} pending={appointments.pending} />
//     </div>
//   );
// };

// export default AppointmentsCard;
