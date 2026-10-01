'use server';

import Header from './Header';
import Form from './Form';

export default async function TechnicalSupport(): Promise<JSX.Element> {
  return (
    <div className="flex w-[90%] sm:w-[70%] h-full gap-3 mt-3 flex-col font-poppins">
      {/* <Header /> */}
      <h2 className="text-2xl font-bold text-primary">Technical Support</h2>
      <Form />
    </div>
  );
}
