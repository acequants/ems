import { InterfaceSerializedError } from '@/interfaces/error.interface';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { serializeUser } from './user.serialize';

export const serializeError = (record: any): InterfaceSerializedError => {
  let user: InterfaceSerializedUser | undefined = undefined;

  if (record.user) {
    user = serializeUser(record.user);
  }
  return {
    _id: JSON.stringify(record._id),
    name: record.name,
    description: record.description,
    state: record.state,
    createdAt: record.createdAt,
    user,
  };
};
