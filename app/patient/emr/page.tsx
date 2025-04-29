import { EMR } from '@components';
import { getUser } from '@service';
export default async function Page() {

  const user = await getUser();

  return (
    <main className="h-full w-full">
      <EMR patient_id={user?.id} />
    </main>
  );
}
