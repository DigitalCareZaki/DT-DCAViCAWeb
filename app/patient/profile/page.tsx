import { PatientProfile } from '@components';

import { getCurrentPatientProfile } from '@service';

export default async function Page(): Promise<JSX.Element> {
  const data = await getCurrentPatientProfile();

  if (!data.success) return <></>;

  return (
    <main className="h-full w-full">
      <PatientProfile {...data.data} />
    </main>
  );
}
