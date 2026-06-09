'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHome } from '@react-icons/all-files/fa/FaHome';
import { IoNotifications } from '@react-icons/all-files/io5/IoNotifications';

import { useCurrentOrganization, useUser } from '@selectors';
import { LogoMainClient } from '@common';
import { getProfilePicture, getName } from '@init-globals';
import ProfileDropDownOption from './ProfileDropDownOption';
import Notifications from './Notifications';
import Communication from './Communication';

import { IoReorderThreeOutline } from 'react-icons/io5';

import type { HeaderProps, ClientComponentProps } from '@types';

const Header: ClientComponentProps<HeaderProps> = ({ user: userProp }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [organization] = useCurrentOrganization();
  const [userFromStore] = useUser();

  const user = userFromStore || userProp;

  const [show, setShow] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
    } else {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [show]);

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
    // Remove all relevant cookies
    deleteCookie('jwt');
    // If you have other cookies, remove them here as well

    // Clear local and session storage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }

    // Force a full reload to clear all client-side state and prevent back navigation
    window.location.replace('/login');
  };

  const getPath = useCallback(
    (uri: string) => {
      return `/${user?.type?.toLowerCase() ?? ''}${uri}`;
    },
    [user?.type]
  );

  // Helper to get theme color for user type
  const getThemeColor = (type: string) => {
    switch (type) {
      case 'DOCTOR':
        return '#0070FA';
      case 'NURSE':
        return '#FFA000';
      case 'ADMIN':
        return '#8697fa';
      case 'SUPERADMIN':
        return '#00B278';
      case 'PATIENT':
        return '#ef233c';
      case 'MASTER':
        return '#252422';
      default:
        return '#259CFA'; // fallback
    }
  };
  const themeColor = getThemeColor(user?.type || '');
  const safePathname = pathname || '';
  // Helper to check if a link is active
  const isActive = (href: string, exact = false) => {
    if (exact) {
      return safePathname === href;
    }
    return safePathname === href || (href !== '/' && safePathname.startsWith(href));
  };

  // Handle notification bell click to redirect to notifications
  const handleNotificationClick = () => {
    router.push(getPath('/notifications'));
  };
  const handleNotificationAdmn = () => {
    router.push(getPath('/settings/notifications'));
  };

  const renderLinks = {
    default: (
      <>
        <Link href={getPath('')}>
          <div className={`flex flex-row-reverse items-center gap-2 ${isActive(getPath(''), true) ? '' : ''}`}>
            <span
              className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath(''), true) ? '' : 'border-transparent'}`}
              style={isActive(getPath(''), true) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            >
              Dashboard
            </span>
            <FaHome size={18} className="text-gray-600" />
          </div>
        </Link>
        <Link passHref href={getPath('/telemed')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/telemed')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/telemed')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Telemedicine
          </span>
        </Link>
        <Link href={getPath('/education')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/education')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/education')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
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
            <span
              className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/emr')) ? '' : 'border-transparent'}`}
              style={isActive(getPath('/emr')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            >
              Lab Reports
            </span>
          </Link>
        ) : (
          <Link href={getPath('/emr')}>
            <span
              className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/emr')) ? '' : 'border-transparent'}`}
              style={isActive(getPath('/emr')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            >
              PHR
            </span>
          </Link>
        )}
        {user.type !== 'PATIENT' && (
          <Link passHref href={getPath('/rag')}>
            <span
              className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/rag')) ? '' : 'border-transparent'}`}
              style={isActive(getPath('/rag')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            >
              RAG
            </span>
          </Link>
        )}
        <Communication />
        <Link href={getPath('/notifications')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/notifications')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/notifications')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Notifications
          </span>
        </Link>
        {user.type === 'DOCTOR' && (
          <>
            {/* <Link href={getPath('/logs')}>
              <span
                className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/logs')) ? '' : 'border-transparent'}`}
                style={isActive(getPath('/logs')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
              >
                Logs
              </span>
            </Link> */}
            <Link href={getPath('/vl')}>
              <span
                className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/vl')) ? '' : 'border-transparent'}`}
                style={isActive(getPath('/vl')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
              >
                AviCardia
              </span>
            </Link>
          </>
        )}
        {/* DOCTOR and NURSE */}
        {user.type !== 'PATIENT' && (
          <>
            <Link href={getPath('/compliance')}>
              <span
                className={`text-link-primary border-b-4 border-solid ${isActive(getPath('/compliance')) ? '' : 'border-transparent'}`}
                style={isActive(getPath('/compliance')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
              >
                Compliance
              </span>
            </Link>
            <Link href={getPath('/devices')}>
              <span
                className={`text-link-primary border-b-4 border-solid ${isActive(getPath('/devices')) ? '' : 'border-transparent'}`}
                style={isActive(getPath('/devices')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
              >
                Devices
              </span>
            </Link>
            <Link href={getPath('/tablets')}>
              <span
                className={`text-link-primary border-b-4 border-solid ${isActive(getPath('/tablets')) ? '' : 'border-transparent'}`}
                style={isActive(getPath('/tablets')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
              >
                Accessories
              </span>
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
          <div className={`flex flex-row-reverse items-center gap-2 ${isActive(getPath(''), true) ? '' : ''}`}>
            <span
              className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath(''), true) ? '' : 'border-transparent'}`}
              style={isActive(getPath(''), true) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            >
              Dashboard
            </span>
            <FaHome size={18} className="text-gray-600" />
          </div>
        </Link>
        <Link href={getPath('/organizations')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/organizations')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/organizations')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Organizations
          </span>
        </Link>
        <Link href={getPath('/emails')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/emails')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/emails')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Emails
          </span>
        </Link>
        <Link href={getPath('/email-templates')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/email-templates')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/email-templates')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Email Templates
          </span>
        </Link>
        <Link href={getPath('/superadmin')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/superadmin')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/superadmin')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Superadmin
          </span>
        </Link>
        <Link href={getPath('/logs')}>
          <span
            className={`text-link-primary text-lg 2xl:text-2xl border-b-4 border-solid ${isActive(getPath('/logs')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/logs')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          >
            Logs
          </span>
        </Link>
      </>
    ),

    administration: (
      <>
        <Link href={getPath('')} className="flex gap-1">
          <div className={`hidden items-center gap-2 lg:flex lg:flex-row-reverse ${isActive(getPath(''), true) ? '' : ''}`}>
            {/* <FaHome size={16} className="hidden text-gray-600 lg:block" /> */}
          </div>
          <ProfileDropDownOption
            title="Dashboard"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath(''), true) ? '' : 'border-transparent'}`}
            style={isActive(getPath(''), true) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        {user.type === 'SUPERADMIN' && (
          <Link href={getPath('/branches')}>
            <ProfileDropDownOption
              title="Branches"
              onClick={handleHeaderOption}
              classes={`border-b-4 border-solid ${isActive(getPath('/branches')) ? '' : 'border-transparent'}`}
              style={isActive(getPath('/branches')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
            />
          </Link>
        )}
        <Link href={getPath('/departments')}>
          <ProfileDropDownOption
            title="Departments"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/departments')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/departments')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        <Link href={getPath('/devices')}>
          <ProfileDropDownOption
            title="Devices"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/devices')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/devices')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        <Link href={getPath('/tablets')}>
          <ProfileDropDownOption
            title="Accessories"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/tablets')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/tablets')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        <Link href={getPath('/users')}>
          <ProfileDropDownOption
            title="Users"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/users')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/users')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        <Communication />
        <Link href={getPath('/videos')}>
          <ProfileDropDownOption
            title="Videos"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/videos')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/videos')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
        <Link href={getPath('/settings')}>
          <ProfileDropDownOption
            title="Settings"
            onClick={handleHeaderOption}
            classes={`border-b-4 border-solid ${isActive(getPath('/settings')) ? '' : 'border-transparent'}`}
            style={isActive(getPath('/settings')) ? { borderColor: themeColor, borderRadius: 0 } : { borderRadius: 0 }}
          />
        </Link>
      </>
    ),
  };

  return (
    <header className="sticky top-0 z-[1000] flex h-16 w-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm border-b border-gray-200">
      <Link passHref href="/">
        <LogoMainClient
          organizationName={organization.name}
          organizationURI={organization.uri}
        />
      </Link>

      <div className="hidden items-center gap-4 text-lg lg:flex 2xl:text-2xl">
        {renderLinks[renderLinkType]}
      </div>

      <div ref={dropdownRef} className="relative flex w-fit flex-col">
        <div className="flex cursor-pointer items-center gap-2">
          <div className="flex flex-row-reverse items-center gap-2">
            <div
              className="lg:hidden"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              <IoReorderThreeOutline size={26} />
            </div>

            {/* Notification Bell Icon with Click Functionality */}
            <div className="relative">
              {(user?.type === 'DOCTOR' || user?.type === 'NURSE' || user?.type === 'PATIENT') ? (
                // For DOCTOR, NURSE, PATIENT - add click functionality
                <div onClick={handleNotificationClick}>
                  <Notifications />
                </div>
              ) : (user?.type === 'ADMIN' || user?.type === 'SUPERADMIN') ? (
                // For ADMIN and SUPERADMIN - original functionality
                <div onClick={handleNotificationAdmn}>
                  <Notifications />
                </div>
              ) : null}
            </div>

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
              className="absolute right-0 top-full z-[1001] flex h-fit w-48 flex-col gap-1 rounded-lg bg-white p-2 text-lg shadow-md 2xl:text-2xl border border-gray-200"
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

              {/* <Link
                className="h-full w-full"
                href={getPath('/contacts')}
                passHref
              >
                <ProfileDropDownOption
                  title="Contact Details"
                  onClick={handleDropDownOption}
                />
              </Link> */}

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
            className="absolute left-0 top-full z-[99999] flex h-fit w-full flex-col gap-1 rounded-lg bg-white p-2 text-lg shadow-md 2xl:text-2xl border border-gray-200"
          >
            {renderLinks[renderLinkType]}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
