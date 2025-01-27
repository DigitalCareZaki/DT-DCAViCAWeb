import type { UserGender, UserRole, UserTitle } from './user';

export type PatientContactsProps = {
  id: string;
  name: string;
  relationship: string;
  number: string;
  email: string | null;
  created_at: string;
};

export type DoctorSpecilityBase = {
  id: string;
  title: string;
  institute_name: string;
  graduation_date: string;
  working_from: string;
  uri: string[];
  created_at: string;
  updated_at: string;
};

export type DoctorDepartmentBase = {
  id: string;
  title: string;
  description: string;
  location_id: string;
  barnch_id: string;
  created_at: string;
  updated_at: string;
};

export type PatientDoctorsProps = {
  user: {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    email: string;
    phone_number: string;
  };
  specialities: {
    title: string;
  }[];
  departments: {
    title: string;
  }[];
};

export type PatientNursesProps = {
  user: {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    email: string;
    phone_number: string;
  };
  department: {
    title: string;
  };
};

export type SearchUserProps = {
  user: {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    id: string;
  };
};

export type SearchNursesProps = SearchUserProps;

export type SearchDoctorProps = SearchUserProps;

export type MeasurementMode = 'METRIC';
export type MeasurementStatus = 'HIGH' | 'LOW' | 'NORMAL';
export type MeasurementType =
  | 'ECG'
  | 'SPO2'
  | 'BLOODPRESSURE'
  | 'BLOODGLUCOSE'
  | 'TEMPERATURE';
export type MeasurementUnit =
  | 'VOLTAGE'
  | 'PERCENTAGE'
  | 'MMHG'
  | 'MGDL'
  | 'FAHRENHEIT';
export type MeasurementReadingSource = 'AUTOMATIC' | 'MANUAL';

export type PatientMeasurementProps = {
  id: string;
  title: string;
  status: MeasurementStatus | null;
  mode: MeasurementMode;
  type: MeasurementType;
  values: Array<number>;
  updated_status: number | null;
  updated_status_by: string | null;
  updated_status_at: string | null;
  unit: MeasurementUnit;
  reading_source: MeasurementReadingSource;
  created_at: string;
  patient: {
    user: {
      id: string;
      email: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
    };
  };
  doctor?: {
    user: {
      id: string;
      email: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
    };
  };
  nurse?: {
    user: {
      id: string;
      email: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
    };
  };
};

export type MedicationUnit =
  | 'TABLET'
  | 'CAPSULE'
  | 'SOFTGEL'
  | 'TEASPOON'
  | 'TABLESPOON';

export type PatientMedicationProps = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  time: string;
  dosage: string;
  frequency: number;
  unit: MedicationUnit;
  created_at: string;
  doctor: {
    user: {
      id: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
    };
  };
};

export type CityBasicProps = {
  id: string;
  name: string;
  country_id: string;
  created_at: string;
  updated_at: string;
  country: CountryBasicProps;
};

export type CountryBasicProps = {
  id: string;
  name: string;
  code: string;
  country_code: string;
  created_at: string;
  updated_at: string;
};

export type LocationBasicProps = {
  id: string;
  lat: number | null;
  long: number | null;
  address: string;
  zipcode: string | null;
  city_id: string;
  created_at: string;
  updated_at: string;
  city: CityBasicProps;
};

export type BasicSpecilityProps = {
  id: string;
  title: string;
  institute_name: string;
  graduation_date: string;
  working_from: string;
  uri: string[];
  created_at: string;
  updated_at: string;
};

export type BasicDepartmentProps = {
  id: string;
  title: string;
  description: string;
  location_id: string;
  barnch_id: string;
  created_at: string;
  updated_at: string;
};

export type BasicDoctorProps = {
  id: string;
  user_id: string;
  // npi_number: string;
  pmdc_number: string;
  contract_type: string;
  // employee_id: string;
  created_at: string;
  updated_at: string;
  specialities: BasicSpecilityProps[];
  departments: BasicDepartmentProps[];
};

export type DoctorProfileProps = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  uri: string | null;
  role: UserRole;
  gender: UserGender;
  title: UserTitle;
  email: string;
  phone_number: string;
  username: string;
  location: LocationBasicProps;
  doctor: BasicDoctorProps;
  created_at: string;
  updated_at: string;
};

export type ArticleProps = {
  id: string;
  title: string;
  content: string;
  uri: string;
  additional_uri: string[];
  refrence: string[];
  likes_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  author: {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    uri: string | null;
    role: UserRole;
    doctor: {
      specialities: {
        title: string;
      }[];
    };
  };
};

export type AppointmentStatus =
  | 'HOLD'
  | 'CANCELLED'
  | 'ONGOING'
  | 'ACTIVE'
  | 'COMPLETED';

export type AppointmentType = 'ONLINE' | 'OFFLINE';

export type AppointmentProps = {
  id: string;
  title: string;
  description: string;
  status: AppointmentStatus;
  type: AppointmentType;
  start_date: string;
  end_date: string;
  created_at: string;
  organizer: {
    first_name: string;
    last_name: string;
    middle_name: string;
    title: UserTitle;
  };
  participants: [
    {
      first_name: string;
      last_name: string;
      middle_name: null | string;
      role: UserRole;
      title: UserTitle;
    },
  ];
};

export type CurrentOrganization = {
  name: string | undefined;
  uri: string | undefined;
  phone_number: string | undefined;
  email: string | undefined;
  active: boolean | undefined;
};

export type SelectOrganizationBranches = {
  id: string;
  name: string;
};

export type CountriesProps = {
  id: string;
  name: string;
};

export type CitiesProps = {
  id: string;
  name: string;
};

export type SelectOrganizationDepartments = {
  id: string;
  title: string;
};

export type SelectUserProps = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
};

export type OrganizationUsersProps = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  username: string;
  role: UserRole;
  gender: UserGender;
  associated_branches: {
    name: string;
  }[];
  active?: boolean;
};

export type BranchesDataProps = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  location: {
    address: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  created_by: string;
  created_at: Date;
};

export type PatientProfileData = {
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: Date;
  uri: string;
  gender: Gender;
  title: Title;
  email: string;
  phone_number: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  patient: {
    emr: string;
    height: number;
    weight: number;
  };
};

export interface InboxDataProps {
  id: string;
  subject: string;
  content: string;
  sender: {
    first_name: string;
    last_name: string;
    middle_name: string;
    uri: null | string;
    email: string;
  };
  attachments: string[];
  created_at: string;
  deleted: boolean;
  starred: boolean;
}

export interface SearchTelemedResProps {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  id: string;
}

export interface SelfAppointmentProps {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  about?: string;
  start_date?: Date;
  end_date?: Date;
  participants?: {
    user: {
      first_name: string;
      last_name: string;
      middle_name: string;
      role: UserRole;
      uri: string;
    };
    status: string;
  }[];
  created_at?: Date;
}

export interface RequestedAppointmentProps {
  status?: string;
  id?: string;
  appointment?: {
    id: string;
    about: string;
    type: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    organizer: {
      id: string;
      first_name: string;
      last_name: string;
      middle_name: string;
      uri: string;
      role: string;
    };
    participants: Array<{ id: string }>;

    created_at: Date;
  };
}

export interface TelemedDetailsProps {
  participants: {
    status: string;
    user: {
      first_name: string;
      last_name: string;
      middle_name: string;
      email: string;
      role: string;
    };
  }[];
  id: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  title: string;
  description: string;
  about: string;
  type: string;
  notes: string[];
  status: string;
  organizer_id: string;
  organizer: {
    first_name: string;
    last_name: string;
    middle_name: string;
  };
}

export interface MeetingMetaDataProps {
  title: string;
  description: string;
  participants: {
    id: string;
  }[];
}

export interface MeetingParticipantsProps {
  user?: {
    first_name: string;
    last_name: string;
    middle_name: string;
    uri: string;
    id: string;
    role: string;
  };
  left?: boolean;
}

export interface MeetingParticipantsPropsSocket {
  appointment_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: UserRole;
  uri: string;
  user_id: string;
}

export interface AppointmentChatProps {
  message: string;
  user_id: string;
  appointment_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  created_at: Date;
  media: string;
}

export interface GetMeetingChatsProps {
  chats: {
    id: string;
    media: string;
    created_at: Date;
    read: boolean;
    message: string;
    auhor: {
      first_name: string;
      last_name: string;
      middle_name: string;
      uri: string;
      role: UserRole;
      id: string;
    };
  }[];
}

export interface ChatRoomProps {
  id: string;
  users: {
    first_name: string;
    last_name: string;
    middle_name: string;
    id: string;
    uri: string;
    email: string;
    role: string;
  }[];
}

export interface SearchChatRoomsProps {
  first_name: string;
  last_name: string;
  middle_name: string;
  id: string;
  uri: string;
  email: string;
  role: string;
}

export interface ChatRoomChatProps {
  message: string;
  created_at: number;
  author_id: string;
  author: {
    first_name: string;
    last_name: string;
    middle_name: string;
    uri: string;
    id: string;
    role: UserRole;
  };
  room_id: string;
}

export interface OrganizationMedicineProps {
  id: string;
  name: string;
  organization: {
    id: string;
    name: string;
  };
  created_at: Date;
}

export type PatientRag = {
  start_date: Date | null;
  end_date: Date | null;

  ecg: PatientRagValue;
  spo2: PatientRagValue;
  bloodpressure: PatientRagValue;
  bloodglucose: PatientRagValue;
  temperature: PatientRagValue;
};

type PatientRagValue = {
  high: number;
  low: number;
  normal: number;
  pending: number;
};

export type PatientCompliance = {
  [key: string]: {
    total: number;
    taken: number;
    not_taken: number;
  };
};

export type PatientCompliancePerPill = {
  user: {
    id: string;
  };
  medications: Array<{
    id: string;
    name: string;
    compliance: PatientCompliance;
  }>;
};

export interface MessageSearchUserProps {
  email: string;
  uri: string | null;
  role: string;
  first_name: string;
  last_name: string;
  middle_name: string;
}

export interface EMRRecordsProps {
  title: string;
  uri: string;
  created: string;
  family_history: string;
  patient: {
    user: {
      first_name: string;
      last_name: string;
      middle_name: string;
      uri: string;
      id: string;
    };
  };
}

export interface MeasurementValuesProps {
  id: string;
  values: number[];
  status: string;
  mode: string;
  type: string;
  unit: string;
  reading_source: string;
  created_at: string;
}

export interface SuperAdminPatientListProps {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  patient: {
    emr: string;
    height: number | null;
    weight: number | null;
  };
  created_at: string;
}

export interface DepartmentProps {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  branch: {
    name: string;
  };
  doctor: {
    id: string;
  }[];
  nurse: {
    id: string;
  }[];
  created_at: Date;
}

export interface PatientReadingRange {
  id: string;
  type: MeasurementType;
  range: number[];
  send_sms: boolean;
  send_email: boolean;
  user: {
    id: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
  };
  patient: {
    user: {
      id: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
    };
  };
  created_at: Date;
  updated_at: Date | null;
}

export interface LogsDataProps {
  id: string;
  method: string;
  endpoint: string;
  module: string;
  platform: string;
  user: {
    middle_name: string | null;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    uri: string;
  };
  created_at: Date;
}

export interface NotificationProps {
  id: string;
  sender: {
    first_name: string;
    last_name: string;
    middle_name: string;
    uri: string;
    email: string;
    role: string;
  };
  title: string;
  description: string;
  created_at: string;
}

export interface EmailsHistoryProps {
  id: string;
  error: string | null;
  sended: boolean;
  subject: string;
  user: {
    first_name: string;
    last_name: string;
    middle_name: string;
    uri: string | null;
    email: string;
  };
  created_at: string;
}

export type MasterOrganizationProps = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  website: string;
  uri: string;
  location: {
    address: string;
    city: {
      name: string;
      country: {
        name: string;
      };
    };
  };
  created_at: string;
};

export type SelectOrganizationProps = {
  id: string;
  name: string;
};

export interface GetSuperAdminProps {
  id: string;
  uri: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  phone_number: string;
  username: string;
  organization: {
    name: string;
  };
  location: {
    city: {
      name: string;
      id: true;
    };
  };
  created_at: string;
}

export interface EmailTemplatesProps {
  id: string;
  active: boolean;
  html: string;
  subject: string;
  key: string;
  created_at: string;
}

export interface DeviceProps {
  id: string;
  title: string;
  description: string | null;
  serial_number: string;
  uri: string | null;
  category: MeasurementType;
  created_by: {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
  };
  patient_devices: {
    issued_to: {
      user: {
        id: string;
        first_name: string;
        middle_name: string | null;
        last_name: string;
        email: string;
      };
    };
    issued_by: {
      id: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
    };
    issued_at: Date;
  }[];
  created_at: Date;
  updated_at: Date | null;
}

export interface PatientMedicationAlert {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  time: Date;
  dosage: string;
  frequency: number;
  unit: MedicationUnit;
  created_at: Date;
  updated_at: Date | null;
  patient_medication_alerts: {
    id: string;
    alert_time: Date;
    taken: MedicationTaken;
  }[];
}

export type VideoPriority = 'HIGH' | 'LOW' | 'UNDEFINED';

export type VideoCategory = 'INFORMATIONAL' | 'MARKETING';

export interface VideoProps {
  id: string;
  title: string;
  description: string;
  uri: string;
  priority: VideoPriority;
  category: VideoCategory;
  author: {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
  };
  created_at: sring;
}

export interface TabletProps {
  id: string;
  title: string;
  serial_number: string;
  uri: string | null;
  category: MeasurementType;
  created_by: {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
  };
  patient_tablets: {
    issued_to: {
      user: {
        id: string;
        first_name: string;
        middle_name: string | null;
        last_name: string;
        email: string;
      };
    };
    issued_by: {
      id: string;
      first_name: string;
      middle_name: string | null;
      last_name: string;
      email: string;
    };
    issued_at: Date;
  }[];
  created_at: Date;
  updated_at: Date | null;
}

export interface AppointmentStats {
  hold: number;
  cancelled: number;
  ongoing: number;
  active: number;
  completed: number;
  pending: number;
}
