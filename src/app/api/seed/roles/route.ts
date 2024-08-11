import { SEED_ROLES } from '@/constants/seed-roles.constant';
import { roleCreate } from '@/lib/actions/role.actions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    for (let i = 0; i < SEED_ROLES.length; i++) {
      await roleCreate({ name: SEED_ROLES[i].name });
    }
    return NextResponse.json({ message: 'Success' });
  } catch (exception) {
    return NextResponse.json({ message: 'Failed' });
  }
}
