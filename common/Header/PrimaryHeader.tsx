'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHome } from '@react-icons/all-files/fa/FaHome';

import { useCurrentOrganization } from '@selectors';
import { LogoMainClient } from '@common';
import { getProfilePicture, getName } from '@init-globals';
import ProfileDropDownOption from './ProfileDropDownOption';
import Notifications from './Notifications';
import Communication from './Communication';

import { IoReorderThreeOutline } from 'react-icons/io5';

import type { HeaderProps, ClientComponentProps } from '@types';

const Header: ClientComponentProps<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const [organization] = useCurrentOrganization();

  const [show, setShow] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const renderLinkType: 'master' | 'administration' | 'default' =
    useMemo(() => {
      if (user?.type === 'MASTER') {
        return 'master';
      } else if (user?.type === 'SUPERADMIN' || user?.type === 'ADMIN') {
        return 'administration';
      } else {
        return 'default';
      }
    }, [user?.type]);

  const handleDropDownOption = useCallback(() => {
    setShow(false);
  }, []);

  const handleHeaderOption = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleLogout = async () => {
    deleteCookie('jwt');
    router.push('/login');
  };

  const getPath = useCallback(
    (uri: string) => {
      return `/${user?.type?.toLowerCase() ?? ''}${uri}`;
    },
    [user?.type]
  );

  const renderLinks = {
    default: (
      <>
        <Link href={getPath('')}>
          <div className="flex flex-row-reverse items-center gap-2">
            <span className="text-link-primary text-lg 2xl:text-2xl">
              Dashboard
            </span>
            <FaHome size={18} className="text-gray-600" />
          </div>
        </Link>
        <Link passHref href={getPath('/telemed')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Telemedicine
          </span>
        </Link>
        <Link href={getPath('/education')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Patient Education
          </span>
        </Link>
        {/* <Link href={getPath('/emr/add')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Lab Reports
          </span>
        </Link> */}
        {user.type == 'DOCTOR' ? (
          <Link href={getPath('/emr')}>
            <span className="text-link-primary text-lg 2xl:text-2xl">
              PHR
            </span>
          </Link>
        ) : (
          <Link href={getPath('/emr')}>
            <span className="text-link-primary text-lg 2xl:text-2xl">
              PHR
            </span>
          </Link>
        )}
        {user.type !== 'PATIENT' && (
          <Link passHref href={getPath('/rag')}>
            <span className="text-link-primary text-lg 2xl:text-2xl">RAG</span>
          </Link>
        )}
        <Communication />
        <Link href={getPath('/notifications')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Notifications
          </span>
        </Link>
        {user.type === 'DOCTOR' && (
          <>
            <Link href={getPath('/logs')}>
              <span className="text-link-primary text-lg 2xl:text-2xl">
                Logs
              </span>
            </Link>
            <Link href={getPath('/vl')}>
              <span className="text-link-primary text-lg 2xl:text-2xl">
                AviCardia
              </span>
            </Link>
          </>
        )}
        {/* DOCTOR and NURSE */}
        {user.type !== 'PATIENT' && (
          <>
            <Link href={getPath('/compliance')}>
              <span className="text-link-primary">Compliance</span>
            </Link>
            <Link href={getPath('/devices')}>
              <span className="text-link-primary">Devices</span>
            </Link>
            <Link href={getPath('/tablets')}>
              <span className="text-link-primary">Accessories</span>
            </Link>
          </>
        )}
        {/* {user.type === 'PATIENT' && (
          <>
            <Link href={getPath('/emr')}>
              <span className="text-link-primary">PHR</span>
            </Link>
          </>
        )} */}
      </>
    ),

    master: (
      <>
        <Link href={getPath('')}>
          <div className="flex flex-row-reverse items-center gap-2">
            <span className="text-link-primary text-lg 2xl:text-2xl">
              Dashboard
            </span>
            <FaHome size={18} className="text-gray-600" />
          </div>
        </Link>
        <Link href={getPath('/organizations')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Organizations
          </span>
        </Link>
        <Link href={getPath('/emails')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">Emails</span>
        </Link>
        <Link href={getPath('/email-templates')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Email Templates
          </span>
        </Link>
        <Link href={getPath('/superadmin')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">
            Superadmin
          </span>
        </Link>
        <Link href={getPath('/logs')}>
          <span className="text-link-primary text-lg 2xl:text-2xl">Logs</span>
        </Link>
      </>
    ),

    administration: (
      <>
        <Link href={getPath('')} className="flex gap-1">
          <div className="hidden items-center gap-2 lg:flex lg:flex-row-reverse">
            <FaHome size={16} className="hidden text-gray-600 lg:block" />
          </div>
          <ProfileDropDownOption
            title="Dashboard"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>
        {user.type === 'SUPERADMIN' && (
          <Link href={getPath('/branches')}>
            <ProfileDropDownOption
              title="Branches"
              onClick={handleHeaderOption}
              classes="lg:hidden"
            />
          </Link>
        )}
        <Link href={getPath('/departments')}>
          <ProfileDropDownOption
            title="Departments"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>
        <Link href={getPath('/devices')}>
          <ProfileDropDownOption
            title="Devices"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>

        {user.type === 'ADMIN' ? (
          <Link href={getPath('/tablets')}>
            <ProfileDropDownOption
              title="Accessories"
              onClick={handleHeaderOption}
              classes="lg:hidden"
            />
          </Link>
        ) : (
          <Link href={getPath('/tablets')}>
            <ProfileDropDownOption
              title="Tablets"
              onClick={handleHeaderOption}
              classes="lg:hidden"
            />
          </Link>
        )}
        <Link href={getPath('/users')}>
          <ProfileDropDownOption
            title="Users"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>
        <Communication />
        <Link href={getPath('/videos')}>
          <ProfileDropDownOption
            title="Videos"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>
        <Link href={getPath('/settings')}>
          <ProfileDropDownOption
            title="Settings"
            onClick={handleHeaderOption}
            classes="lg:hidden"
          />
        </Link>
      </>
    ),
  };

  return (
    <header className="relative flex h-16 w-full items-center justify-between rounded-2xl bg-white p-4">
      <Link passHref href="/">
        <LogoMainClient
          organizationName={organization.name}
          organizationURI={organization.uri}
        />
      </Link>

      <div className="hidden items-center gap-4 text-lg lg:flex 2xl:text-2xl">
        {renderLinks[renderLinkType]}
      </div>

      <div className="relative flex w-fit flex-col">
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex flex-row-reverse items-center gap-2">
            <div
              className="lg:hidden"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              <IoReorderThreeOutline size={26} />
            </div>
            <Notifications />
            <div
              onClick={() => setShow((prev) => !prev)}
              className="relative h-10 w-10 rounded-full bg-black"
            >
              <Image
                src={getProfilePicture(user.uri)}
                alt="profile-image"
                className="h-full w-full rounded-full object-cover"
                fill
              />
            </div>

            <div
              onClick={() => setShow((prev) => !prev)}
              className="flex flex-col items-end leading-none"
            >
              {/* First line: Greetings! and name */}
              <div className="flex gap-2 text-sm font-semibold text-gray-600">
                <span className="theme-text-color font-semibold">
                  Greetings!
                </span>
                {getName({
                  first_name: user?.first_name ?? '',
                  middle_name: user?.middle_name ?? '',
                  last_name: user?.last_name ?? '',
                })}
              </div>

              {/* Second line: Specialty and Profile Settings */}
              <div className="flex gap-4 text-xs">
                {/* <span className="text-primary-500">Specialty</span> */}
                <span className="text-gray-400">Profile Settings</span>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{
                opacity: 0,
                y: 0,
              }}
              animate={{
                opacity: 1,
                y: 20,
              }}
              exit={{
                y: 10,
                opacity: 0,
              }}
              className="absolute left-0 top-full z-50 flex h-fit w-full flex-col gap-1 rounded-lg bg-white p-2 text-lg shadow-md 2xl:text-2xl"
            >
              <Link
                className="h-full w-full"
                href={getPath('/profile')}
                passHref
              >
                <ProfileDropDownOption
                  title="My Profile"
                  onClick={handleDropDownOption}
                />
              </Link>

              <Link
                className="h-full w-full"
                href={getPath('/contacts')}
                passHref
              >
                <ProfileDropDownOption
                  title="Contact Details"
                  onClick={handleDropDownOption}
                />
              </Link>

              {/* <Link
                className="h-full w-full"
                href={getPath('/profile')}
                passHref
              >
                <ProfileDropDownOption
                  // title="Next of Kin Info"
                  onClick={handleDropDownOption}
                />
              </Link> */}

              <Link
                className="h-full w-full"
                href={getPath('/change-password')}
                passHref
              >
                <ProfileDropDownOption
                  title="Edit Password"
                  onClick={handleDropDownOption}
                />
              </Link>
              <Link
                className="h-full w-full"
                href={getPath('/pincode')}
                passHref
              >
                <ProfileDropDownOption
                  title="Pincode"
                  onClick={handleDropDownOption}
                />
              </Link>
              <ProfileDropDownOption title="Logout" onClick={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {openDrawer && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 20,
            }}
            exit={{
              y: 10,
              opacity: 0,
            }}
            className="absolute left-0 top-full z-50 flex h-fit w-full flex-col gap-1 rounded-lg bg-white p-2 text-lg shadow-md 2xl:text-2xl"
          >
            {renderLinks[renderLinkType]}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
