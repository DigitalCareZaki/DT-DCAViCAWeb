import { Icon } from '../Icon';

import type { ButtonPromotion as Props } from './types';

export default function ButtonPromotion({
  heading,
  name,
  iconName,
  ...props
}: Props): JSX.Element {
  return (
    <div
      {...props}
      className="w-32 sm:w-40 h-12 rounded-md bg-black flex items-center justify-center text-white py-2 cursor-pointer gap-2"
    >
      <Icon name={iconName} size={28} style={{ color: '#fff' }} />
      <div className="flex flex-col">
        <span className="text-ssx">{name}</span>
        <span className="text-xs -mt-1">{heading}</span>
      </div>
    </div>
  );
}
