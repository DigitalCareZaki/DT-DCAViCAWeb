'use server';

import { getStats } from '@service';
import Card from './Card';

import type { ServerComponent } from '@types';

const Statistics: ServerComponent = async () => {
  const stats = await getStats();

  if (!stats.success) return <></>;

  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <Card title="Users" value={stats.data.users} />
      <Card title="Organizations" value={stats.data.organizations} />
      <Card title="Branches" value={stats.data.branches} />
      <Card title="Emails" value={stats.data.emails} />
      <Card title="Devices" value={stats.data.devices} />
      <Card title="Patients" value={stats.data.patients} />
      <Card title="Nurses" value={stats.data.nurses} />
      <Card title="Doctors" value={stats.data.doctors} />
    </div>
  );
};

export default Statistics;
