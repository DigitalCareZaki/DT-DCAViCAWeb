'use server';

import Header from './Header';
import Form from './Form';

export default async function TechnicalSupport(): Promise<JSX.Element> {
  return (
    <div className="flex w-[70%] flex-col gap-6 font-poppins">
      <Header />
      <Form />
    </div>
  );
}
