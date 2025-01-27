import Image from 'next/image';
import { loginBackground } from '@assets';

export default function BackgroundImage(): JSX.Element {
  return (
    <div className="absolute w-[30rem] h-[30rem] left-0 bottom-10">
      <Image
        src={loginBackground}
        alt="login-background"
        className="w-full h-full object-cover"
        fill
      />
    </div>
  );
}
