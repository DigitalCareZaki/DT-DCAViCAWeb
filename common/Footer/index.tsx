'use server';

export async function Footer(): Promise<JSX.Element> {
  return (
    <footer className="w-full h-32 flex flex-col items-center justify-center gap-4">
      <p className="font-semibold text-center">
        This product is licensed from Aman Ventures Platform, AV (a US
        Corporation) © {new Date().getFullYear()} as Mobility Health Platform,
        MH | All rights reserved.
      </p>
      <div className="w-[80%] flex flex-row items-center justify-center gap-6">
        <button className="w-48 h-10 bg-[#0070FA] text-white font-light rounded">
          Privacy
        </button>
        <button className="w-48 h-10 bg-[#0070FA] text-white font-light rounded">
          Terms & Conditions
        </button>
      </div>
      <p className="font-light text-center">HealthTech Partner Digital Care</p>
    </footer>
  );
}
