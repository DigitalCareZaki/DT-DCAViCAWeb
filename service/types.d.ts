import { SlotParent } from '../common/Telemed/Dashboard/Settings/Form/types';
import type {
  PatientContactsProps,
  PatientDoctorsProps,
  SearchDoctorProps,
  PatientNursesProps,
  SearchNursesProps,
  PatientMeasurementProps,
  PatientMedicationProps,
  DoctorProfileProps,
  UserRole,
  UserGender,
  UserTitle,
  ArticleProps,
  AppointmentProps,
  CurrentOrganization,
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
  OrganizationUsersProps,
  SelectUserProps,
  SelectOrganizationDepartments,
  BranchesDataProps,
  PatientProfileData,
  InboxDataProps,
  SearchTelemedResProps,
  SelfAppointmentProps,
  RequestedAppointmentProps,
  TelemedDetailsProps,
  MeetingMetaDataProps,
  MeetingParticipantsProps,
  GetMeetingChatsProps,
  ChatRoomProps,
  OrganizationMedicineProps,
  PatientRag,
  PatientCompliance,
  PatientCompliancePerPill,
  MessageSearchUserProps,
  EMRRecordsProps,
  MeasurementValuesProps,
  DepartmentProps,
  PatientReadingRange,
  LogsDataProps,
  NotificationProps,
  EmailsHistoryProps,
  DeviceProps,
  MasterOrganizationProps,
  SelectOrganizationProps,
  GetSuperAdminProps,
  EmailTemplatesProps,
  PatientMedicationAlert,
  VLAllPatients,
  VLSinglePatientECG,
  TabletProps,
  VideoProps,
  AppointmentStats,
  SiteProps,
} from '@types';

export type GetPatientRes = {
  data: PatientListingData[];
  success: boolean;
};

export type GetPatientProfile = {
  data: {
    id: string;
    emr: string;
    weight: null | number;
    height: null | number;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
      dob: string;
      uri: string | null;
      role: UserRole;
      gender: UserGender;
      title: UserTitle;
      email: string;
      phone_number: string;
      username: string;
      created_at: string;
      updated_at: string;
      location: {
        id: string;
        lat: number;
        long: number;
        address: string;
        zipcode: string;
        created_at: string;
        updated_at: string;
        city: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          country: {
            id: string;
            name: string;
            code: string;
            country_code: string;
            created_at: string;
            updated_at: string;
          };
        };
      };
      user_meta_data: {
        id: string;
        ip_address: string;
        device_info: string;
        os: string;
        last_access: null | string;
        timezone: null | string;
        user_id: string;
        created_at: string;
        updated_at: string;
      }[];
    };
  };
  success: boolean;
};

export type PatientListingData = {
  emr: string;
  weight: null | number;
  height: null | number;
  patient: {
    id: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    uri: string | null;
    phone_number: string;
  };
};

export type GetPatientContacts = {
  success: boolean;
  data: PatientContactsProps[];
};

export type GetPatientDoctors = {
  success: boolean;
  data: Array<PatientDoctorsProps>;
};

export type GetSearchDoctor = {
  success: boolean;
  data: Array<SearchDoctorProps>;
};

export type GetPatientNurses = {
  success: boolean;
  data: Array<PatientNursesProps>;
};

export type GetSearchNurse = {
  success: boolean;
  data: Array<SearchNursesProps>;
};

export type GetPatientsMeasurementsProps = {
  success: boolean;
  data: any;
};

export type GetPatientMedicationProps = {
  success: boolean;
  data: Array<PatientMedicationProps>;
  pagination: {
    totalItems: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
};

export type GetDoctorProfileProps = {
  success: boolean;
  data: DoctorProfileProps;
};

export type GetArticlesProps = {
  success: boolean;
  data: ArticleProps[];
};

export type ViewArticleProps = {
  success: boolean;
  data: ArticleProps;
};

export type DetailArticleProps = {
  success: boolean;
  data: ArticleProps;
};

export type GetAppointmentsProps = {
  success: boolean;
  data: AppointmentProps[];
};

export type GetCurrentOrganization = {
  success: boolean;
  data: CurrentOrganization;
};

export type GetOrganizationPatients = {
  success: boolean;
  data: PatientListingData[];
  pagination: {
    totalItems: number;
    perPage: number;
    currentPage: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    nextPage: number | null,
    prevPage: number | null,
  };
};

export type GetOrganizationBranches = {
  success: boolean;
  data: any;
};

export type GetOrganizationBranchesSelect = {
  success: boolean;
  data: SelectOrganizationBranches[];
};

export type GetCitiesProps = {
  success: boolean;
  data: CitiesProps[];
};

export type GetCountriesProps = {
  success: boolean;
  data: CountriesProps[];
};

export type GetOrganizationUsers = {
  success: boolean;
  data: OrganizationUsersProps[];
};

export type GetOrganizationDoctors = {
  success: boolean;
  data: SelectUserProps[];
};

export type GetOrganizationNurses = {
  success: boolean;
  data: SelectUserProps[];
};

export type GetOrganizationDepartments = {
  success: boolean;
  data: SelectOrganizationDepartments[];
};

export type AddDataProps = {
  success: boolean;
  message?: string;
};

export type ComposeMessageProps = {
  success: boolean;
  message?: string;
};

export type GetSuperAdminStats = {
  success: boolean;
  data: {
    doctors: number;
    patients: number;
    nurses: number;
    branches: number;
    departments: number;
    appointments: number;
    medications: number;
  };
};

export type GetBranchesProps = {
  success: boolean;
  data: BranchesDataProps[];
};

export type GetCurrentPatientProfile = {
  success: boolean;
  data: PatientProfileData;
};

export type GetInbox = {
  success: boolean;
  data: InboxDataProps[];
};

export type SendMessageAction = {
  success: boolean;
  message: string;
};

export type TelemedSearchUsersProps = {
  success: boolean;
  data: SearchTelemedResProps[];
};

export type AddTelemedProps = {
  success: boolean;
  message?: string;
};

export type GetSelfAppointments = {
  success: boolean;
  data: SelfAppointmentProps[];
};

export type GetRequestedAppointments = {
  success: boolean;
  data: RequestedAppointmentProps[];
};

export type GetRequestedCalendar = {
  success: boolean;
  data: SlotParent;
};

export type UpdateTelemedActionProps = {
  success: boolean;
  message?: string;
};

export type FetchTelemedDetails = {
  success: boolean;
  data: TelemedDetailsProps;
};

export type ValidateAppointment = {
  success: boolean;
  message?: string;
};

export type FetchMeetingMetaData = {
  success: boolean;
  data: MeetingMetaDataProps;
};

export type JoinMeetingProps = {
  success: boolean;
};

export type FetchMeetingParticipants = {
  success: boolean;
  data: MeetingParticipantsProps[];
};

export type LeftMeetingProps = {
  success: boolean;
};

export type FetchMeetingChatsProps = {
  success: boolean;
  data: GetMeetingChatsProps;
};

export type UpdateMeetingStatusProps = {
  success: boolean;
};

export type FetchRoomsProps = {
  success: boolean;
  data: ChatRoomProps[];
};

export type SearchRoomsProps = {
  success: boolean;
  data: ChatRoomProps[];
};

export type CreateRoomProps = {
  success: boolean;
  data: ChatRoomProps | null;
  message?: string;
};

export type GetRoomChats = {
  success: boolean;
  data: any;
};

export type OrganizationMedicine = {
  success: boolean;
  data: {
    data: OrganizationMedicineProps[];
    pagination: {
      totalItems: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  }
};

export type GetDoctorRagsProps = {
  success: boolean;
  data: PatientRag;
};

export type GetDoctorCombinedComplianceProps = {
  success: boolean;
  data: PatientCompliance;
};

export type GetDoctorCompliancePerPillProps = {
  success: boolean;
  data: PatientCompliancePerPill;
};

export type SearchArticileProps = {
  success: boolean;
  data: ArticleProps[];
};

export type SearchUsersMessagesProps = {
  success: boolean;
  data: MessageSearchUserProps[];
};

export type GetPatientRecords = {
  success: boolean;
  data: EMRRecordsProps[];
};

export type AddPatientEMRRecord = {
  success: boolean;
};

export type GetLatestPatientMeasurement = {
  success: boolean;
  data: MeasurementValuesProps[];
};

export type GetDepartmentsProps = {
  success: boolean;
  data: DepartmentProps[];
};

export type GetDepartmentBranchesProps = {
  success: boolean;
  data: {
    id: string;
    name: string;
  }[];
};

export type GetPatientReadingRangeProps = {
  success: boolean;
  data: PatientReadingRange[];
};

export type GetLogs = {
  success: boolean;
  data: {
    data: LogsDataProps[];
    pagination: {
      totalItems: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  }
};

export type GetNotifications = {
  success: boolean;
  data: {
    data: NotificationProps[];
    pagination: {
      totalItems: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  }
};

export type GetEmailsHistory = {
  success: boolean;
  data: {
    data: EmailsHistoryProps[];
    pagination: {
      totalItems: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  };
};

export type GetDeviceProps = {
  success: boolean;
  data: DeviceProps[];
};

export type GetSingleDeviceProps = {
  success: boolean;
  data: DeviceProps & {
    id: string;
  };
};

export type AddDeviceProps = {
  success: boolean;
  data: DeviceProps | null;
  message?: string;
};

export type ResetPasswordRequest = {
  success: boolean;
  message: string;
};

export type ResetPassword = {
  success: boolean;
  message: string;
};

export type VerifyPincodeProps = {
  success: boolean;
  message?: string;
};

export type ExistsPincodeProps = {
  success: boolean;
};

export type GetMasterStatistics = {
  success: boolean;
  data: {
    users: number;
    organizations: number;
    branches: number;
    emails: number;
    devices: number;
    patients: number;
    nurses: number;
    doctors: number;
  };
};

export type GetOrganizationProps = {
  success: boolean;
  data: MasterOrganizationProps[];
};

export type CreateOrganizationProps = {
  success: boolean;
  message?: string;
};

export type GetSelectOrganizations = {
  success: boolean;
  data: SelectOrganizationProps[];
};

export type AddSuperadminProps = {
  success: boolean;
  message?: string;
};

export type GetSuperAdminsProps = {
  success: boolean;
  data: GetSuperAdminProps[];
};

export type GetEmailTemplatesProps = {
  success: boolean;
  data: EmailTemplatesProps[];
};

export type GetToggleEmailTemplate = {
  success: boolean;
  message?: string;
};

export type GetPatientTodayMedicationAlerts = {
  success: boolean;
  data: PatientMedicationAlert[];
};

export type GetVLAllPatients = {
  success: boolean;
  data: VLAllPatients;
};

export type GetSinglePatientECGData = {
  success: boolean;
  data: VLSinglePatientECG;
};

export type GetTabletProps = {
  success: boolean;
  data: TabletProps[];
};

export type GetSingleTabletProps = {
  success: boolean;
  data: TabletProps & {
    id: string;
  };
};

export type AddTabletProps = {
  success: boolean;
  data: TabletProps | null;
  message?: string;
};

export type GetVideosProps = {
  success: boolean;
  data: VideoProps[];
};

export type AddVideosProps = {
  success: boolean;
  data: VideoProps | null;
};

export type AddTechnicalSupportQueryProps = {
  success: boolean;
};

export type GetAppointmentStats = {
  success: boolean;
  data: AppointmentStats;
};

export type SitesResponse = {
  success: boolean;
  data: {
    data: SiteProps[];
    pagination: {
      totalItems: number;
      perPage: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  };
};


export type CreateSiteProps = {
  success: boolean;
  message: string;
};
