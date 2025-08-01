import { IoMdMedical } from '@react-icons/all-files/io/IoMdMedical';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { RiNurseFill } from '@react-icons/all-files/ri/RiNurseFill';
import { RiAdminFill } from '@react-icons/all-files/ri/RiAdminFill';
import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import { MdTimelapse } from '@react-icons/all-files/md/MdTimelapse';
import { IoNotifications } from '@react-icons/all-files/io5/IoNotifications';
import { RiMedicineBottleFill } from '@react-icons/all-files/ri/RiMedicineBottleFill';

const data = {
  users: [
    {
      title: 'Add Patient',
      id: 'add-patient',
      path: '/users/add-patient',
      Icon: FaUser,
    },
    {
      title: 'Add Nurse',
      id: 'add-nurse',
      path: '/users/add-nurse',
      Icon: RiNurseFill,
    },
    {
      title: 'Add Doctor',
      id: 'add-doctor',
      path: '/users/add-doctor',
      Icon: IoMdMedical,
    },
    {
      title: 'Add Admin',
      id: 'add-admin',
      path: '/users/add-admin',
      Icon: RiAdminFill,
    },
  ],
  settings: [
    {
      title: 'Email History',
      id: 'emails-history',
      path: '/settings/email-history',
      Icon: MdEmail,
    },
    {
      title: 'SMS History',
      id: 'sms-history',
      path: '/settings/sms-history',
      Icon: MdEmail,
    },
    {
      title: 'Notifications',
      id: 'notifications',
      path: '/settings/notifications',
      Icon: IoNotifications,
    },
    {
      title: 'Medications',
      id: 'medications',
      path: '/settings/medications',
      Icon: RiMedicineBottleFill,
    },
  ],
};

export default data;
