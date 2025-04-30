import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { globalSlice } from './global';
import { patientSlice } from './patients';
import { articleSlice } from './articles';
import { telemedSlice } from './telemed';
import { superadminSlice } from './superadmin';
import { meetingSlice } from './meeting';
import { socketSlice } from './socket';
import { chatSlice } from './chat';
import { emrSlice } from './emr';
import { complianceSlice } from './compliance';
import { departmentSlice } from './departments';
import { logsSlice } from './logs';
import { notificationSlice } from './notifications';
import { changepasswordSlice } from './changepassword';
import { contactsSlice } from './contact';
import { pincodeSlice } from './pincode';

const store = configureStore({
  reducer: {
    user: userSlice,
    global: globalSlice,
    patients: patientSlice,
    articles: articleSlice,
    telemed: telemedSlice,
    superadmin: superadminSlice,
    meeting: meetingSlice,
    socket: socketSlice,
    chats: chatSlice,
    changePasswords: changepasswordSlice,
    emr: emrSlice,
    compliance: complianceSlice,
    departments: departmentSlice,
    logs: logsSlice,
    notifications: notificationSlice,
    contacts: contactsSlice,
    pincodes: pincodeSlice,
  },
});

export default store;
