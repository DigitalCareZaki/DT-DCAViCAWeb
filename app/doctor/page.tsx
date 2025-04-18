import { DoctorHome } from '@components';

export default function Page(): JSX.Element {
  console.log("come here");

  return (
    <main className="h-full w-full">
      <DoctorHome />
    </main>
  );
}
