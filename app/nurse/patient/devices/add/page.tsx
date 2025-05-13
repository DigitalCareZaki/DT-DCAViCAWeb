import type { Metadata } from 'next';
import CreateDevice from '../create';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <CreateDevice data={undefined} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Create Device',
  description: 'Avica | Create Device',
};
