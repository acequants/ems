'use server';

import {
  InterfaceUserCreate,
  InterfaceUserFetchMany,
} from '@/interfaces/user.interface';
import { connectToDb } from '../mongoose';
import { revalidatePath } from 'next/cache';
import { FilterQuery } from 'mongoose';
import { InterfaceFetchMany } from '@/interfaces/general.interface';

import User from '../models/user.model';
import Role from '../models/role.model';
import Error from '../models/error.model';

export async function userUpsert({
  id,
  role,
  name,
  email,
  image,
  onboarded,
  path,
}: InterfaceUserCreate): Promise<void> {
  try {
    connectToDb();

    await User.findOneAndUpdate(
      { id },
      {
        name: name?.toLowerCase(),
        role,
        email,
        image,
        onboarded,
      },
      { upsert: true }
    );

    if (role) {
      const newUser = await User.findOne({ id });

      if (newUser) {
        await Role.findByIdAndUpdate(role, {
          $push: { users: newUser._id },
        });
      }
    }
    if (path === '/users/profile') {
      revalidatePath(path);
    }
  } catch (exception: any) {
    console.log(exception);

    throw new Error(`Failed to create/update user`);
  }
}

export async function userFetchOne(id: string): Promise<any> {
  try {
    connectToDb();

    return await User.findOne({ id }).populate({ path: 'role', model: Role });
  } catch (exception) {
    console.log('Unable to fetch single user: ', exception);
  }
}

export async function userFetchMany({}: InterfaceUserFetchMany): Promise<InterfaceFetchMany> {
  try {
    connectToDb();

    const query: FilterQuery<typeof User> = {};
    const recordsQuery = User.find(query)
      .populate({ path: 'role', model: Role })
      .populate({ path: 'errors', model: Error });
    const records = await recordsQuery.exec();

    return { records };
  } catch (exception) {
    console.log(exception);
    throw new Error('Unable to fetch users');
  }
}

export async function userFetchAll({
  sortBy = 'desc',
}: InterfaceUserFetchMany): Promise<any[]> {
  try {
    connectToDb();

    const query: FilterQuery<typeof User> = {};
    const recordsQuery = User.find(query).sort({ createdAt: sortBy });
    const records = await recordsQuery.exec();

    return records;
  } catch (exception) {
    console.log(exception);

    throw new Error('Unable to fetch users');
  }
}
