'use client';

import { STATE_ERROR_LOG } from '@/enums/error.enum';
import {
  InterfaceErrorsTable,
  InterfaceErrorUpdate,
  InterfaceSerializedError,
} from '@/interfaces/error.interface';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';
import { errorDelete, errorUpdate } from '@/lib/actions/error.actions';
import { userFetchAll } from '@/lib/actions/user.actions';
import { serializeUser } from '@/lib/serializations/user.serialize';
import { isWhiteSpaces } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { DataTable } from '../shared/DataTable';
import { ErrorsTableExpansion } from './ErrorsTableExpansion';

import DataTableFilter from '../shared/DataTableFilter';

const ErrorsTable: FC<InterfaceErrorsTable> = ({ records }) => {
  const path = usePathname();

  const [users, setUsers] = useState<InterfaceSerializedUser[]>([]);
  const [input, setInput] = useState<InterfaceErrorUpdate>({
    path,
    _id: undefined,
    _userId: undefined,
    state: undefined,
  });
  const [filterText, setFilterText] = useState('');
  const subHeaderComponentMemo = useMemo<ReactNode>(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <DataTableFilter
        filterText={filterText}
        onFilter={(event) => setFilterText(event.target.value)}
        onClear={handleClear}
      />
    );
  }, [filterText]);

  const filteredRecords = records.filter(
    (item: InterfaceSerializedError) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.user?.name && item.user.name.includes(filterText.toLowerCase()))
  );
  const handleUpdate = () => {
    errorUpdate(input);
    document?.getElementById('modal-update-error-state')?.click();
  };
  const handleDelete = (_id: string) => {
    errorDelete(_id, path);
  };
  const columns = [
    {
      name: 'ERROR NAME',
      sortable: true,
      wrap: true,
      width: '250px',
      selector: (row: any) => row.name,
      cell: (row: any) => row.name,
    },
    {
      name: 'ASSIGNED TO',
      sortable: true,
      wrap: true,
      width: '250px',
      selector: (row: any) => row.user?.name,
      cell: (row: any) => (
        <>
          {row.user ? (
            <>
              <img
                className='me-2 rounded-circle'
                src={row.user.image}
                alt=''
                width={40}
                height={40}
              />
              {row.user.name}
            </>
          ) : (
            <span className='text-primary'>Pending Assignment</span>
          )}
        </>
      ),
    },
    {
      name: 'STATE',
      sortable: true,
      wrap: true,
      selector: (row: any) => row.state,
      cell: (row: any) => (
        <>
          {row.state ? (
            <span className='badge bg-success p-1'>Resolved</span>
          ) : (
            <span className='badge bg-danger p-1'>Pending</span>
          )}
        </>
      ),
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
            data-bs-target='#modal-update-error-state'
            onClick={() =>
              setInput({
                ...input,
                state: row.state,
                _id: row._id,
                _userId: row.user?._id,
              })
            }
          >
            <i className='mdi mdi-pen'></i>
          </button>
          <a
            href='#'
            className='btn btn-light btn-sm'
            onClick={() => handleDelete(row._id)}
          >
            <i className='mdi mdi-delete'></i>
          </a>
        </>
      ),
    },
  ];

  useEffect(() => {
    userFetchAll({}).then((data) => {
      if (data) {
        const records: InterfaceSerializedUser[] = [];

        for (let i = 0; i < data.length; i++) {
          records.push(serializeUser(data[i]));
        }
        setUsers(records);
      }
    });
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredRecords}
        tableExpansion={ErrorsTableExpansion}
        subHeaderComponent={subHeaderComponentMemo}
      />
      <div
        className='modal fade'
        id='modal-update-error-state'
        role='dialog'
        aria-labelledby='errorStateModal'
        aria-hidden='true'
        tabIndex={-1}
      >
        <div className='modal-dialog modal-dialog-centered modal-md'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title' id='errorStateModal'>
                Update Error State
              </h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-hidden='true'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleUpdate}>
                <div className='mb-3'>
                  <label htmlFor='user'>Choose a User to Assign</label>
                  <select
                    className='form-select'
                    id='user'
                    defaultValue={input._userId}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        _userId: isWhiteSpaces(e.target.value)
                          ? undefined
                          : e.target.value,
                      })
                    }
                  >
                    <option value=' '></option>
                    {users.map(
                      (record: InterfaceSerializedUser, index: number) => (
                        <option
                          key={`record-${index}`}
                          value={record._id}
                          selected={input._userId === record._id}
                        >
                          {record.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='resolvedError'
                      checked={input.state === STATE_ERROR_LOG.RESOLVED}
                      onChange={() =>
                        setInput({
                          ...input,
                          state:
                            input.state === STATE_ERROR_LOG.RESOLVED
                              ? STATE_ERROR_LOG.PENDING
                              : STATE_ERROR_LOG.RESOLVED,
                        })
                      }
                    />
                    <label className='form-check-label' htmlFor='resolvedError'>
                      Mark error as resolved
                    </label>
                  </div>
                </div>
                <button type='submit' className='btn btn-primary btn-md w-100'>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorsTable;
