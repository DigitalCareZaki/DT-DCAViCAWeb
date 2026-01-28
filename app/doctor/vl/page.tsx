import { VivalinkHome } from '@components';

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): JSX.Element {
  return (
    <main className="w-full h-full">
      <VivalinkHome searchParams={searchParams} />
    </main>
  );
}
