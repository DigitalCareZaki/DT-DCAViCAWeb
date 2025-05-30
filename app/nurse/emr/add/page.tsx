import { AddEMR } from '@components';

const Page = ({ searchParams }: any) => {
  return (
    <main className="h-full w-full">
      <AddEMR searchParams={searchParams} />
    </main>
  );
}
export default Page;