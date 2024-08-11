import { InterfaceSerializedError } from '@/interfaces/error.interface';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { serializeError } from './error.serialize';
import { InterfaceSerializedRole } from '@/interfaces/role.interface';
import { serializeRole } from './role.serialize';

export const serializeUser = (record: any): InterfaceSerializedUser => {
  let role: InterfaceSerializedRole | undefined = undefined;

  if (record.role) {
    role = serializeRole(record.role);
  }
  const errors: InterfaceSerializedError[] = [];

  for (let i = 0; i < record.errors?.length; i++) {
    errors.push(serializeError(record.errors[i]));
  }
  return {
    _id: record._id,
    id: record.id,
    email: record.email,
    image: record.image,
    name: record.name,
    onboarded: record.onboarded,
    role,
    errors,
  };
};
