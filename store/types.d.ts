import type { StoreUserState } from './user/types';
import type { StoreGlobalState, ModalState } from './global/types';
import type { StorePatientState } from './patients/types';
import type { StoreArticlesState } from './articles/types';
import type { StoreTelemedState } from './telemed/types';
import type { StoreSuperAdminState } from './superadmin/types';
import type { StoreMeetingState } from './meeting/types';
import type { StoreSocketProps as StoreSocketState } from './socket/types';
import type { StoreChatState } from './chat/types';
import type { StoreEMRState } from './emr/types';
import type { StoreComplianceState } from './compliance/types';
import type { StoreDepartmentState } from './departments/types';
import type { StoreLogsState } from './logs/types';
import type { StoreNotificationProps } from './notifications/types';
import { StoreChangePasswordState } from './changepassword/types';

export type ReduxProps = {
  user: StoreUserState;
  global: StoreGlobalState;
  patients: StorePatientState;
  articles: StoreArticlesState;
  telemed: StoreTelemedState;
  superadmin: StoreSuperAdminState;
  meeting: StoreMeetingState;
  socket: StoreSocketState;
  chats: StoreChatState;
  emr: StoreEMRState;
  compliance: StoreComplianceState;
  departments: StoreDepartmentState;
  logs: StoreLogsState;
  notifications: StoreNotificationProps;
  changePasswords: StoreChangePasswordState;
};

export {
  StoreGlobalState,
  StoreUserState,
  StorePatientState,
  StoreArticlesState,
  StoreTelemedState,
  StoreSuperAdminState,
  ModalState,
  StoreMeetingState,
  StoreSocketState,
  StoreChatState,
  StoreEMRState,
  StoreComplianceState,
  StoreDepartmentState,
  StoreLogsState,
  StoreNotificationProps,
  StoreChangePasswordState,
};
