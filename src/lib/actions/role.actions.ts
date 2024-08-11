'use server';

import { connectToDb } from '../mongoose';
import { revalidatePath } from 'next/cache';
import {
  InterfaceRoleCreate,
  InterfaceRoleFetchMany,
  InterfaceRoleUpdate,
} from '@/interfaces/role.interface';
import { FilterQuery } from 'mongoose';
import { InterfaceFetchMany } from '@/interfaces/general.interface';

import Role from '../models/role.model';
import User from '../models/user.model';

export async function roleCreate({
  name,
  path,
}: InterfaceRoleCreate): Promise<void> {
  try {
    connectToDb();

    await Role.create({ name: name?.toLowerCase() });

    if (path) {
      revalidatePath(path);
    }
  } catch (exception: any) {
    console.log(exception);

    throw new Error(`Failed to create role`);
  }
}

export async function roleUpdate({
  _id,
  name,
  path,
}: InterfaceRoleUpdate): Promise<void> {
  try {
    connectToDb();

    const updatedRole = await Role.findOneAndUpdate(
      { _id },
      { name: name?.toLowerCase() }
    );

    if (!updatedRole) {
      throw new Error('Role not found');
    }
    revalidatePath(path);
  } catch (exception: any) {
    console.log(exception);

    throw new Error(`Failed to update role`);
  }
}

export async function roleFetchMany({}: InterfaceRoleFetchMany): Promise<InterfaceFetchMany> {
  try {
    connectToDb();

    const query: FilterQuery<typeof Role> = {};
    const recordsQuery = Role.find(query).populate({
      path: 'users',
      model: User,
    });
    const records = await recordsQuery.exec();

    return { records };
  } catch (exception) {
    console.log(exception);

    throw new Error('Unable to fetch roles');
  }
}

export async function roleDelete(_id: string, path: string): Promise<void> {
  try {
    connectToDb();

    const deletedRole = await Role.findOneAndDelete({ _id });

    if (!deletedRole) {
      throw new Error('Role not found');
    }
    revalidatePath(path);
  } catch (exception) {
    console.log(exception);

    throw new Error(`Failed to delete role`);
  }
}
