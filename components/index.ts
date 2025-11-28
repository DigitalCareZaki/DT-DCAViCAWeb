export * from './Auth';
export { default as TermsAndCondition } from './TermsConditions';
export { default as TechnicalSupport } from './TechnicalSupport';
export { default as PrivacyPolicy } from './PrivacyPolicy';

// Admin
export { default as AdminHome } from './Admin';
export { default as AdminAppointments } from './Admin/Appointments';

// Common
export { default as Chat } from './Chat';
export { default as Meeting } from './Meeting';

// Doctor
export { default as DoctorHome } from './Doctor/Home';
export { default as DoctorProfile } from './Doctor/Profile';
export { default as DoctorTelemed } from './Doctor/Telemed';
export { default as DoctorViewAppointment } from './Doctor/Telemed/ViewAppointment';
export { default as ViewMeeting } from './Doctor/Telemed/View';
export { default as AnalyticsWrapper } from './Doctor/Analytics';
export { default as DoctorAddAppointment } from './Doctor/Telemed/AddAppointment';
export { default as DoctorTelemedMeetings } from './Doctor/Telemed/Meetings';
export { default as DoctorTelemedAddMeeting } from './Doctor/Telemed/Meetings/AddMeeting';
export { default as DoctorEducation } from './Doctor/Education';
export { default as DoctorCompliance } from './Doctor/Compliance';
export { default as DoctorCreateEducation } from './Doctor/Education/CreateEducation';
export { default as DoctorEMR } from './DoctorEMR';
export { default as DoctorDevices } from './DoctorDevices';

// Doctor Patients
export { default as DoctorPatientProfile } from './Doctor/Patients/Profile';
export { default as DoctorPatientContacts } from './Doctor/Patients/Contacts';
export { default as DoctorPatientDoctors } from './Doctor/Patients/Doctors';
export { default as DoctorPatientNurses } from './Doctor/Patients/Nurses';
export { default as DoctorPatientMeasurements } from './Doctor/Patients/Measurements';
export { default as DoctorPatientMedication } from './Doctor/Patients/Medication';
export { default as DoctorPatientAlerts } from './Doctor/Patients/Alerts';
export { default as Contacts } from './Contact'

// Nurse
export { default as NurseHome } from './Nurse/Home';
export { default as NurseProfile } from './Nurse/Profile';
export { default as NurseTelemed } from './Nurse/Telemed';
export { default as NurseViewAppointment } from './Nurse/Telemed/ViewAppointment';
export { default as NurseAddAppointment } from './Nurse/Telemed/AddAppointment';
export { default as NurseEducation } from './Nurse/Education';
export { default as NurseCompliance } from './Nurse/Compliance';
export { default as NurseDevices } from './NurseDevices';
export { default as NursesRoleWrapper } from './Nurse/Patients/NursesRole';
// Nurse Patients
export { default as NursePatientProfile } from './Nurse/Patients/Profile';
export { default as NursePatientContacts } from './Nurse/Patients/Contacts';

export { default as TelemedicineNurses } from './Nurse/Patients/Telemedicine';
export { default as NursePatientDoctors } from './Nurse/Patients/Doctors';
export { default as NursePatientNurses } from './Nurse/Patients/Nurses';
export { default as NursePatientMeasurements } from './Nurse/Patients/Measurements';
export { default as NursePatientMedication } from './Nurse/Patients/Medication';
export { default as NursePatientAlerts } from './Nurse/Patients/Alerts';

// Super Admin
export { default as SuperAdminHome } from './SuperAdmin';
export { default as SuperAdminUsers } from './SuperAdmin/Users';
export { default as SuperAdminAddPatients } from './SuperAdmin/Users/AddPatients';
export { default as SuperAdminAddNurse } from './SuperAdmin/Users/AddNurses';
export { default as SuperAdminAddDoctor } from './SuperAdmin/Users/AddDoctor';
export { default as SuperAdminAddAdmin } from './SuperAdmin/Users/AddAdmin';
export { default as SuperAdminBranches } from './SuperAdmin/Branches';
export { default as SuperAdminAddBranch } from './SuperAdmin/Branches/Add';
export { default as SuperAdminProfile } from './SuperAdmin/Profile';

// Patient
export { default as PatientHome } from './Patient/Home';
export { default as PatientProfile } from './Patient/Profile';
export { default as PatientCompliance } from './Patient/Compliance';
export { default as PatientEducation } from './Patient/Education';
export { default as PatientMeasurement } from './Patient/Measurement';

// Vivalink
export { default as VivalinkHome } from './Vivalink';

// Messages
export { default as MessageToolbar } from './Messages/Toolbar';
export { default as MessageSidebar } from './Messages/Sidebar';
export { default as MessageContent } from './Messages/Content';
export { default as MessageSidebarFallback } from './Messages/Sidebar/Fallback';
export { default as MessageToolbarFallback } from './Messages/Toolbar/Fallback';
export { default as MessageContentFallback } from './Messages/Content/Fallback';
export { default as MessageComposeModal } from './Messages/Compose';
export { default as EMR } from './EMR';
export { default as AddEMR } from './EMR/Add';

// Departments
export { default as Departments } from './Departments';
export { default as CreateDepartment } from './Departments/Create';
export { default as EditDepartment } from './Departments/Edit';

// Devices
export { default as Devices } from './Devices';
export { default as CreateDevice } from './Devices/Create';
export { default as AssignDevice } from './Devices/Assign';

export { default as Pincode } from './Pincode';
export { default as Settings } from './Settings';
export { default as EmailsTemplates } from './EmailsTemplates';

// Master
export { default as Master } from './Master';
export { default as Organization } from './Organizations';
export { default as CreateOrganization } from './Organizations/Create';
export { default as CreateSuperAdmin } from './Master/Superadmin';
export { default as SuperadminList } from './Master/SuperadminList';

// Videos
export { default as Videos } from './Videos';
export { default as AddVideos } from './Videos/AddVideos';

// Tablets
export { default as Tablets } from './Tablets';
export { default as CreateTablet } from './Tablets/Create';
export { default as AssignTablet } from './Tablets/Assign';
export { default as EditAccessory } from './Tablets/EditAccessory';

// Organization Medicine
export { default as OrganizationMedicine } from './OrganizationMedicine';
