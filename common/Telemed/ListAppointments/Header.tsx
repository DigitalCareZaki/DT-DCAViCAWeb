'use server';

import Link from 'next/link';

import { getUserTypeHeaders } from '@actions';

import { ButtonPrimary } from '../../Button';
import { InputBasic } from '../../Input';
import Counter from '../Counters';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="screen-title">Appointments</span>
        <div className="flex items-center gap-4 ">
          <div className="flex w-60">
            <InputBasic placeholder="Search" icon="IoSearch" borderTheme />
          </div>

          <div className="w-fit">
            <Link
              passHref
              href={`/${userType?.toLowerCase() ?? ''}/telemed/add-appointment`}
            >
              <ButtonPrimary
                name="Appointments"
                className="h-10 rounded-lg px-4"
                icon="IoMdAdd"
                variant="icon"
              />
            </Link>
          </div>
        </div>
      </div>
      <Counter />
    </div>
  );
};

export default Header;
