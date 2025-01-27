import { ButtonPrimary, InputPrimary } from '@common';

import Promotion from '../Promotion';

export default function Form(): JSX.Element {
  return (
    <form className="w-[70%] flex flex-col items-center gap-6 font-poppins">
      <h2 className="font-bold text-primary text-2xl">Enter Pin</h2>
      <div className="w-full flex flex-col gap-6 text-sm text-secondary">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Pin Code</span>
          <span className="text-xs">Enter Your 6 Digit Pin Code</span>
        </div>
        <InputPrimary placeholder="123456" icon="MdPin" iconSize={24} />
        <div className="w-full flex items-center gap-4">
          <ButtonPrimary name="Submit" />
          <ButtonPrimary
            name="Cancel"
            style={{
              backgroundColor: '#000000',
            }}
          />
        </div>
      </div>
      <Promotion />
    </form>
  );
}
