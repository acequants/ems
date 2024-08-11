import { SortOrder } from 'mongoose';
import { TypeErrorLogState } from '@/types/error.type';
import { InterfaceSerializedUser } from './user.interface';

export interface InterfaceErrorLog {
  name?: string;
  description?: string;
  user?: string;
  path: string;
}

export interface InterfaceErrorFetchMany {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export interface InterfaceErrorsTable {
  records: InterfaceSerializedError[];
}

export interface InterfaceSerializedError {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  state: TypeErrorLogState;
  user?: InterfaceSerializedUser;
}

export interface InterfaceErrorUpdate {
  path: string;
  _id?: string;
  _userId?: string;
  state?: TypeErrorLogState;
}
