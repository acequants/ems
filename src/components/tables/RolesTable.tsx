'use client';

import {
  InterfaceRolesTable,
  InterfaceRoleUpdate,
} from '@/interfaces/role.interface';
import { roleDelete } from '@/lib/actions/role.actions';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { DataTable } from '../shared/DataTable';

import RoleUpdateForm from '../forms/FormRoleUpdate';

const RolesTable: FC<InterfaceRolesTable> = ({ records }) => {
  const path = usePathname();

  const [input, setInput] = useState<InterfaceRoleUpdate>({
    path,
    _id: undefined,
    name: undefined,
  });

  const handleDelete = (_id: string) => {
    roleDelete(_id, path);
  };
  const columns = [
    {
      name: 'NAME',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.name,
      cell: (row: any) => row.name,
    },
    {
      name: 'USERS',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.users,
      cell: (row: any) => {
        const userCount = row.users?.length;

        return (
          <>
            {userCount || 0} User{userCount > 1 ? 's' : undefined}
          </>
        );
      },
    },
    {
      name: 'ACTION',
      sortable: false,
      wrap: true,
      center: true,
      width: '100px',
      selector: (row: any) => row.id,
      cell: (row: any) => (
        <>
          <button
            type='button'
            className='btn btn-light btn-sm me-1'
            data-bs-toggle='modal'
            data-bs-target='#modal-update-role'
            onClick={() =>
              setInput({
                ...input,
                _id: row._id,
                name: row.name,
              })
            }
          >
            <i className='mdi mdi-pen'></i>
          </button>
          <button
            type='button'
            className='btn btn-light btn-sm'
            onClick={() => handleDelete(row._id)}
          >
            <i className='mdi mdi-delete'></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={records} />
      <div
        className='modal fade'
        id='modal-update-role'
        role='dialog'
        aria-labelledby='errorStateModal'
        aria-hidden='true'
        tabIndex={-1}
      >
        <div className='modal-dialog modal-dialog-centered modal-md'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title' id='errorStateModal'>
                Update Role
              </h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-hidden='true'
              ></button>
            </div>
            <div className='modal-body'>
              <RoleUpdateForm input={input} setInput={setInput} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolesTable;
