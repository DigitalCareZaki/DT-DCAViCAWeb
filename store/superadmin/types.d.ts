import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CurrentOrganization,
  OrganizationUsersProps,
  BranchesDataProps,
} from '@types';

export interface StoreSuperAdminState {
  current: CurrentOrganization;
  profile: null;
  users: OrganizationUsersProps[];
  branches: BranchesDataProps[];
}

export type ReducerFunc = (
  state: StoreUserState,
  payload: PayloadAction<StoreSuperAdminState>
) => void;

export type SetCurrentOrganizationProps = (
  state: StoreSuperAdminState,
  payload: PayloadAction<{ current: CurrentOrganization }>
) => void;

export type SetOrganizationUsersFunc = (
  state: StoreSuperAdminState,
  payload: PayloadAction<{ users: OrganizationUsersProps[] }>
) => void;

export type SetBranchesProps = (
  state: StoreSuperAdminState,
  payload: PayloadAction<{ branches: BranchesDataProps[] }>
) => void;
