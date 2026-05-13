export type UserProps = {
  address?: string;
  phone_number?: string;
  associated_branches?: {
    id?: string;
    name?: string;
  }[];
  branch_id?: string;
  branchId?: string;
  title?: UserTitle;
  gender?: UserGender;
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  // type is same as role, do not change else you'll whereever it is being used
  type: UserRole | undefined;
  role: UserRole | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  middle_name: string | undefined;
  token: string | undefined;
  uri?: string;
  isPincode: boolean;
};

export type UserRole =
  | 'MASTER'
  | 'SUPERADMIN'
  | 'ADMIN'
  | 'DOCTOR'
  | 'NURSE'
  | 'PATIENT';

export type UserGender = 'MALE' | 'FEMALE' | 'TRANS' | 'UNKNOWN';

export type UserTitle = 'MR' | 'MS' | 'MRS' | 'MISS' | 'MASTER' | 'MADAM';
