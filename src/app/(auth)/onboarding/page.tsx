import { userFetchOne } from '@/lib/actions/user.actions';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import FormUserProfile from '@/components/forms/FormUserProfile';

async function Page() {
  const user: User | null = await currentUser();

  if (!user) return null;

  let userData = await userFetchOne(user.id);

  if (userData?.onboarded) redirect('/');

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
            btnLabel={'Continue'}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default Page;
