'use server';

import { connectToDb } from '../mongoose';
import { revalidatePath } from 'next/cache';
import { FilterQuery } from 'mongoose';
import {
  InterfaceErrorFetchMany,
  InterfaceErrorLog,
  InterfaceErrorUpdate,
} from '@/interfaces/error.interface';
import { InterfaceFetchMany } from '@/interfaces/general.interface';
import { TypeErrorLogState } from '@/types/error.type';
import { STATE_ERROR_LOG } from '@/enums/error.enum';

import User from '../models/user.model';
import Error from '../models/error.model';

export async function errorLog({
  name,
  description,
  user,
  path,
}: InterfaceErrorLog) {
  try {
    connectToDb();

    const loggedError = await Error.create({
      name,
      description,
      user: user || null,
    });

    if (user) {
      await User.findByIdAndUpdate(user, {
        $push: { errors: loggedError._id },
      });
    }
    revalidatePath(path);
  } catch (exception: any) {
    console.log(exception);

    throw new Error(`Failed to log error`);
  }
}

export async function errorUpdate(input: InterfaceErrorUpdate): Promise<void> {
  const { path, _id, state, _userId } = input;

  try {
    let updateFields: Record<string, string | TypeErrorLogState> = {};

    if (
      state === STATE_ERROR_LOG.PENDING ||
      state === STATE_ERROR_LOG.RESOLVED
    ) {
      updateFields['state'] = state;
    }

    if (_userId) {
      // TODO: Remove error from previously assigned user.

      const updatedUser = await User.findByIdAndUpdate(_userId, {
        $push: { errors: _id },
      });

      if (updatedUser) {
        updateFields['user'] = updatedUser._id;
      }
    }
    const updatedError = await Error.findOneAndUpdate({ _id }, updateFields);

    if (!updatedError) {
      throw new Error('Error log not found');
    }
    revalidatePath(path);
  } catch (exception) {
    console.log(exception);

    throw new Error(`Failed to update error log`);
  }
}

export async function errorFetchMany({}: InterfaceErrorFetchMany): Promise<InterfaceFetchMany> {
  try {
    connectToDb();

    const query: FilterQuery<typeof Error> = {};
    const recordsQuery = Error.find(query).populate({
      path: 'user',
      model: User,
    });
    const records = await recordsQuery.exec();

    return { records };
  } catch (exception) {
    console.log(exception);

    throw new Error('Unable to fetch error logs');
  }
}

export async function errorDelete(id: string, path: string): Promise<void> {
  try {
    connectToDb();

    const deletedError = await Error.findOneAndDelete({ id });

    if (!deletedError) {
      throw new Error('Error log not found');
    }
    revalidatePath(path);
  } catch (exception) {
    console.log(exception);

    throw new Error(`Failed to delete error log`);
  }
}
