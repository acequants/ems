import { SortOrder } from 'mongoose';
import { InterfaceSerializedUser } from './user.interface';
import { Dispatch, SetStateAction } from 'react';

export interface InterfaceSeedRole {
  name: string;
}

export interface InterfaceRoleCreate {
  path?: string;
  name?: string;
}

export interface InterfaceRoleUpdate {
  path: string;
  _id?: string;
  name?: string;
}

export interface InterfaceRoleFetchMany {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export interface InterfaceRolesTable {
  records: InterfaceSerializedRole[];
}

export interface InterfaceSerializedRole {
  _id: string;
  name: string;
  createdAt: string;
  users: InterfaceSerializedUser[];
}

export interface InterfaceRoleUpdateForm {
  input: InterfaceRoleUpdate;
  setInput: Dispatch<SetStateAction<InterfaceRoleUpdate>>;
}
