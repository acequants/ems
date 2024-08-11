import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { userFetchMany, userFetchOne } from '@/lib/actions/user.actions';
import { serializeUser } from '@/lib/serializations/user.serialize';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import UsersTable from '@/components/tables/UsersTable';

async function Page() {
  const currUser = await currentUser();

  if (!currUser) return null;

  const userData = await userFetchOne(currUser.id);

  if (!userData?.onboarded) redirect('/onboarding');

  const _user = await userFetchMany({});
  const records: InterfaceSerializedUser[] = [];

  if (_user) {
    for (let i = 0; i < _user.records?.length; i++) {
      records.push(serializeUser(_user.records[i]));
    }
  }

  return (
    <>
      <div className='page-title-right'>
        <ol className='breadcrumb m-0'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active'>Users</li>
        </ol>
      </div>

      <h4 className='page-title'>Users</h4>

      <div className='row'>
        <div className='col-md-12'>
          <UsersTable records={records} />
        </div>
      </div>
    </>
  );
}

export default Page;
