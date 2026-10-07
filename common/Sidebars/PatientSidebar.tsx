'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import { MdPermContactCalendar } from '@react-icons/all-files/md/MdPermContactCalendar';
import { BiRuler as TbRulerMeasure } from '@react-icons/all-files/bi/BiRuler';
import { BiPlusMedical as PiPillFill } from '@react-icons/all-files/bi/BiPlusMedical';
import { IoIosNotifications } from '@react-icons/all-files/io/IoIosNotifications';
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings';
import { IoIosMedical } from '@react-icons/all-files/io/IoIosMedical';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { BsFileText } from '@react-icons/all-files/bs/BsFileText';
import { IoPulseOutline } from '@react-icons/all-files/io5/IoPulseOutline';

import { useUser } from '@selectors';
import { getPatientProfile } from '@actions';
import { getPatientIdRemoveAlert } from '@service';
import { getProfilePicture, getName } from '@init-globals';

import type { ClientComponent } from '@types';
import { twMerge } from 'tailwind-merge';

const Sidebar: ClientComponent = () => {
  const params = useSearchParams();

  const [user] = useUser();

  const [patient, setPatient] = useState<{
    uri: string | null;
    first_name: string | null;
    last_name: string | null;
    middle_name: string | null;
    emr: string | null;
    user_id: string | null;
  }>({
    uri: null,
    first_name: null,
    last_name: null,
    middle_name: null,
    emr: null,
    user_id: null,
  });
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [isCurrentUserDoctor, setIsCurrentUserDoctor] = useState<boolean>(false);

  const getPath = useCallback(
    (url: string) => {
      if (!user.type) return '/';

      return `/${user.type?.toLowerCase()}${url}`;
    },
    [user.type]
  );

  useEffect(() => {
    if (!params?.get('patient')?.length) return;

    (async () => {
      const patientId = params.get('patient') as string;

      // Fetch patient profile for display purposes
      const patient = await getPatientProfile(patientId);

      setPatient({
        uri: patient?.data?.user?.uri,
        first_name: patient?.data?.user?.first_name,
        last_name: patient?.data?.user?.last_name,
        middle_name: patient?.data?.user?.middle_name,
        emr: patient?.data?.emr,
        user_id: patient?.data?.user?.id,
      });

      // Call the new API to get user_id and check if it matches current user
      try {
        const patientUserData = await getPatientIdRemoveAlert(patientId);
        if (patientUserData.success && patientUserData.data.user_id) {
          setIsCurrentUserDoctor(user.id === patientUserData.data.user_id);
        }
      } catch (error) {
        console.error('Error fetching patient user ID:', error);
        setIsCurrentUserDoctor(false);
      }
    })();
  }, [params, user.id]);

  // "/doctor/patient/profile"
  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
        width: sidebar ? '10%' : '5%',
      }}
      className="h-full w-[5%] py-6 pb-4 "
    >
      <div
        className={twMerge(
          'theme-text-color flex h-full w-full flex-col items-center rounded-xl bg-white px-2 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400',
          sidebar ? 'gap-6' : 'gap-4'
        )}
      >
        <div
          onClick={() => setSidebar((prev) => !prev)}
          className="patient-profile-bar-icon cursor-pointer"
        >
          {sidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
        <div title={getName({ ...(patient as any) })}>
          {/* <Link passHref href={getPath('/patient/profile')}> */}
            <div className="relative h-7 w-7 rounded-full">
              <Image
                src={getProfilePicture(patient?.uri)}
                alt="profile-picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
          {/* </Link> */}
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <span
            title={getName({ ...(patient as any) })}
            className="max-w-[90%] truncate text-xs font-semibold"
          >
            {getName({ ...(patient as any) })}
          </span>
          <span
            title={patient.emr ?? "Can't get EMR"}
            className="max-w-[90%] truncate text-xs font-light"
          >
            {patient.emr ?? "Can't get EMR"}
          </span>
        </div>
        <div
          title="Contacts"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex w-full bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(
              `/patient/contacts?patient=${params?.get('patient')}`
            )}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <MdPermContactCalendar size={18} />
            {sidebar && <span className="text-xs">Contacts</span>}
          </Link>
        </div>
        <div
          title="Doctors"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/doctors?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosMedical size={18} />
            {sidebar && <span className="text-xs">Doctors</span>}
          </Link>
        </div>

        <div
          title="Telemedicine "
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/telemedicine?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosMedical size={18} />
            {sidebar && <span className="text-xs">Telemedicine</span>}
          </Link>
        </div>

        <div
          title="Nurses"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/nurses?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosMedical size={18} />
            {sidebar && <span className="text-xs">Nurses</span>}
          </Link>
        </div>
        <div
          title="Measurements"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(
              `/patient/measurements?patient=${params?.get('patient')}`
            )}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <TbRulerMeasure size={18} />
            {sidebar && <span className="text-xs">Measurements</span>}
          </Link>
        </div>
        <div
          title="Medication"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(
              `/patient/medication?patient=${params?.get('patient')}`
            )}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <PiPillFill size={18} />
            {sidebar && <span className="text-xs">Medication</span>}
          </Link>
        </div>
        {isCurrentUserDoctor && (
          <div
            title="Alerts"
            className={twMerge(
              'patient-profile-bar-icon',
              sidebar && 'flex bg-background px-2'
            )}
          >
            <Link
              passHref
              href={getPath(`/patient/alerts?patient=${params?.get('patient')}`)}
              className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
            >
              <IoIosNotifications size={18} />
              {sidebar && <span className="text-xs">Alerts</span>}
            </Link>
          </div>
        )}
        <div
          title="Devices"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/devices?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoPulseOutline size={18} />
            {sidebar && <span className="text-xs">Devices</span>}
          </Link>
        </div>
        <div
          title="Reports"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/reports?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <BsFileText size={18} />
            {sidebar && <span className="text-xs">PHR</span>}
          </Link>
        </div>
        <div
          title="Profile"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/profile?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosSettings size={18} />
            {sidebar && <span className="text-xs">Profile</span>}
          </Link>

        </div>
        <div
          title="Notifications"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/notifications?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosSettings size={18} />
            {sidebar && <span className="text-xs">Notifications</span>}
          </Link>

        </div>

        <div
          title="Sms"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/sms-history?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosSettings size={18} />
            {sidebar && <span className="text-xs">Sms</span>}
          </Link>

        </div>

        <div
          title="Email History"
          className={twMerge(
            'patient-profile-bar-icon',
            sidebar && 'flex bg-background px-2'
          )}
        >
          <Link
            passHref
            href={getPath(`/patient/email-history?patient=${params?.get('patient')}`)}
            className={twMerge('flex gap-2', sidebar ? 'w-full' : 'w-fit')}
          >
            <IoIosSettings size={18} />
            {sidebar && <span className="text-xs">Email History</span>}
          </Link>

        </div>

      </div>
    </motion.div>
  );
};

export default Sidebar;
