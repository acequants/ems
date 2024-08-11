import { SortOrder } from 'mongoose';
import { InterfaceSerializedError } from './error.interface';
import { InterfaceSerializedRole } from './role.interface';

export interface InterfaceContextUser {
  user: {
    id: string;
    role?: string;
    name?: string;
    email?: string;
    image?: string;
    onboarded?: boolean;
  };
  btnLabel: string;
}

export interface InterfaceUserCreate {
  id: string;
  role?: string;
  name?: string;
  email?: string;
  image?: string;
  onboarded?: boolean;
  path: string;
}

export interface InterfaceUserFetchMany {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export interface InterfaceUsersTable {
  records: InterfaceSerializedUser[];
}

export interface InterfaceSerializedUser {
  _id: string;
  id: string;
  email: string;
  image: string;
  name: string;
  onboarded: boolean;
  errors: InterfaceSerializedError[];
  role?: InterfaceSerializedRole;
}
