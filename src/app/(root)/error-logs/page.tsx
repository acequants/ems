import { errorFetchMany } from '@/lib/actions/error.actions';
import { userFetchAll, userFetchOne } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { serializeError } from '@/lib/serializations/error.serialize';
import { InterfaceSerializedError } from '@/interfaces/error.interface';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { serializeUser } from '@/lib/serializations/user.serialize';

import FormErrorLog from '@/components/forms/FormErrorLog';
import ErrorsTable from '@/components/tables/ErrorsTable';

async function Page() {
  const _user = await currentUser();

  if (!_user) return null;

  const userData = await userFetchOne(_user.id);

  if (!userData?.onboarded) redirect('/onboarding');

  const _error = await errorFetchMany({});
  const records: InterfaceSerializedError[] = [];

  if (_error) {
    for (let i = 0; i < _error.records?.length; i++) {
      records.push(serializeError(_error.records[i]));
    }
  }

  const _users = await userFetchAll({});
  const users: InterfaceSerializedUser[] = [];

  for (let i = 0; i < _users?.length; i++) {
    users.push(serializeUser(_users[i]));
  }

  return (
    <>
      <div className='page-title-right'>
        <ol className='breadcrumb m-0'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active'>Errors</li>
        </ol>
      </div>

      <h4 className='page-title'>Errors</h4>

      <div className='row'>
        <div className='col-12'>
          <button
            type='button'
            className='btn btn-primary btn-sm float-end mb-3'
            data-bs-toggle='modal'
            data-bs-target='#modal-log-error'
          >
            New Error
          </button>

          <div
            className='modal fade'
            id='modal-log-error'
            tabIndex={-1}
            role='dialog'
            aria-labelledby='error-modal'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered modal-lg'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='error-modal'>
                    New Error
                  </h4>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-hidden='true'
                  ></button>
                </div>
                <div className='modal-body'>
                  <FormErrorLog users={users} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <ErrorsTable records={records} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
