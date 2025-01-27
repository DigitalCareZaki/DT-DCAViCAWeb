'use server';

import Header from '../Auth/Header';

export default async function PrivacyPolicy(): Promise<JSX.Element> {
  return (
    <div className="flex h-full w-full flex-col p-8 text-black">
      <Header />
      <div className="flex w-full flex-col gap-8 text-xs">
        <div className="flex flex-col gap-6">
          <span className="font-bold uppercase text-secondary">
            Privacy Policy
          </span>
          <p className="text-justify">We value your privacy.</p>
        </div>
      </div>
    </div>
  );
}
