import { userFetchOne } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function Page() {
  const _user = await currentUser();

  if (!_user) return null;

  const userData = await userFetchOne(_user.id);

  if (!userData?.onboarded) redirect('/onboarding');

  return (
    <>
      <div className='page-title-right'>
        <ol className='breadcrumb m-0'>
          <li className='breadcrumb-item active'>Home</li>
        </ol>
      </div>

      <h4 className='page-title'>Home</h4>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body text-center'>
              <h1>Error Management System</h1>
              <h2>(E M S)</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
