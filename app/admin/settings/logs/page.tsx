
import { Logs } from '@common';

export default function Page(): JSX.Element {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Logs />
    </div>
  );
}