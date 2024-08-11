import { InterfaceSerializedRole } from '@/interfaces/role.interface';
import { roleFetchMany } from '@/lib/actions/role.actions';
import { userFetchOne } from '@/lib/actions/user.actions';
import { serializeRole } from '@/lib/serializations/role.serialize';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import FormRoleCreate from '@/components/forms/FormRoleCreate';
import RolesTable from '@/components/tables/RolesTable';

async function Page() {
  const _user = await currentUser();

  if (!_user) return null;

  const userData = await userFetchOne(_user.id);

  if (!userData?.onboarded) redirect('/onboarding');

  const _role = await roleFetchMany({});
  const records: InterfaceSerializedRole[] = [];

  if (_role) {
    for (let i = 0; i < _role.records?.length; i++) {
      records.push(serializeRole(_role.records[i]));
    }
  }

  return (
    <>
      <div className='page-title-right'>
        <ol className='breadcrumb m-0'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active'>Roles</li>
        </ol>
      </div>

      <h4 className='page-title'>Roles</h4>

      <div className='row'>
        <div className='col-12'>
          <button
            type='button'
            className='btn btn-primary btn-sm float-end mb-3'
            data-bs-toggle='modal'
            data-bs-target='#modal-new-role'
          >
            New Role
          </button>

          <div
            className='modal fade'
            id='modal-new-role'
            tabIndex={-1}
            role='dialog'
            aria-labelledby='NewRoleModal'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered modal-lg'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='NewRoleModal'>
                    New Role
                  </h4>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-hidden='true'
                  ></button>
                </div>
                <div className='modal-body'>
                  <FormRoleCreate />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-12'>
          <RolesTable records={records} />
        </div>
      </div>
    </>
  );
}

export default Page;
