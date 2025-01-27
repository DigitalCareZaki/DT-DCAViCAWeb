import { PatientCompliance } from '@components';

export default async function Page(): Promise<JSX.Element> {
  return (
    <main className="h-full w-full">
      <PatientCompliance />
    </main>
  );
}
