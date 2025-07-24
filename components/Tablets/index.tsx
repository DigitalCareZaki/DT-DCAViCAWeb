'use client';

import { useSelector } from 'react-redux';
import Header from './Home/Header';
import Table from './Home/Table';
import type { ReduxProps } from 'store/types';

interface TabletsProps {
  patient?: string | null;
}

const Tablets = ({ patient }: TabletsProps) => {
  const user = useSelector((state: ReduxProps) => state.user.user);

  if (!user?.role) return null;

  return (
    <div className="flex h-screen w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header userRole={user.role?.toLowerCase()} />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Table userRole={user.role?.toLowerCase()} patient={patient} />
      </div>
    </div>
  );
};

export default Tablets;
