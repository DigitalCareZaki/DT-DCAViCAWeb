import type { AssignedCareTeam, CareTeamMember } from '@service';

type Props = {
  careTeam: AssignedCareTeam;
};

function getMemberName(member: CareTeamMember, prefix?: string) {
  return [prefix, member.first_name, member.last_name].filter(Boolean).join(' ');
}

function MemberCard({
  label,
  member,
  prefix,
}: {
  label: string;
  member: CareTeamMember;
  prefix?: string;
}) {
  const initials = `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`;

  return (
    <div className="flex min-w-0 items-center gap-4 rounded-lg border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-base font-bold uppercase text-red-500">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
          {label}
        </p>
        <p className="truncate text-lg font-semibold text-gray-700 sm:text-xl">
          {getMemberName(member, prefix)}
        </p>
      </div>
    </div>
  );
}

export default function CareTeam({ careTeam }: Props) {
  const { primary_doctor: doctor, primary_nurse: nurse } = careTeam;

  if (!doctor && !nurse) return null;

  return (
    <section
      aria-label="Primary care team"
      className="grid grid-cols-1 gap-4 px-4 sm:px-8 lg:grid-cols-2"
    >
      {doctor && (
        <MemberCard label="Primary Doctor" member={doctor} prefix="Dr." />
      )}
      {nurse && (
        <MemberCard label="Primary Nurse" member={nurse} />
      )}
    </section>
  );
}
