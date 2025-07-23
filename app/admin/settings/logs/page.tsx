import { Logs } from '@common';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full overflow-auto">
      <Logs />
    </main>
  );
}
