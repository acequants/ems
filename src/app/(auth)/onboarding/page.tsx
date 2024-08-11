import { userFetchOne } from '@/lib/actions/user.actions';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import FormUserProfile from '@/components/forms/FormUserProfile';
import { roleFetchMany } from '@/lib/actions/role.actions';
import { InterfaceSerializedRole } from '@/interfaces/role.interface';
import { serializeRole } from '@/lib/serializations/role.serialize';

async function Page() {
  const user: User | null = await currentUser();

  if (!user) return null;

  let userData = await userFetchOne(user.id);

  if (userData?.onboarded) redirect('/');

  const data = await roleFetchMany({});
  const records: InterfaceSerializedRole[] = [];

  for (let i = 0; i < data.records?.length; i++) {
    records.push(serializeRole(data.records[i]));
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className='text-center'>Onboarding</h3>

        {user ? (
          <FormUserProfile
            user={{
              id: user?.id,
              role: userData?.role?.id,
              name: userData?.name || user?.username,
              email: userData?.email,
              image: userData?.image || user?.imageUrl,
              onboarded: userData?.onboarded,
            }}
            roles={records}
            btnLabel={'Continue'}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default Page;
