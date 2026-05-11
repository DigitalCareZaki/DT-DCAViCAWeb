import { EditDepartment } from '@components';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <EditDepartment id={params.id} />
    </main>
  );
}

