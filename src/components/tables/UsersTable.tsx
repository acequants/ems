'use client';

import { InterfaceUsersTable } from '@/interfaces/user.interface';
import { FC } from 'react';
import { DataTable } from '../shared/DataTable';

const UsersTable: FC<InterfaceUsersTable> = ({ records }) => {
  const columns = [
    {
      name: 'NAME',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.name,
      cell: (row: any) => (
        <>
          <img
            className='me-2 rounded-circle'
            src={row.image}
            alt=''
            width={40}
            height={40}
          />
          {row.name}
        </>
      ),
    },
    {
      name: 'ROLE',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.role,
      cell: (row: any) => row.role?.name,
    },
    {
      name: 'ASSIGNED ERRORS',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.errors,
      cell: (row: any) => {
        const errorCount = row.errors?.length;

        return (
          <>
            {errorCount || 0} Error{errorCount > 1 ? 's' : undefined}
          </>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={records} />;
};

export default UsersTable;
