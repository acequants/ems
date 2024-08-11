import { InterfaceSerializedRole } from '@/interfaces/role.interface';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { serializeUser } from './user.serialize';

export const serializeRole = (record: any): InterfaceSerializedRole => {
  const users: InterfaceSerializedUser[] = [];

  for (let i = 0; i < record.users?.length; i++) {
    users.push(serializeUser(record.users[i]));
  }
  return {
    _id: JSON.stringify(record._id),
    name: record.name,
    createdAt: record.createdAt,
    users,
  };
};
