'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isWhiteSpaces } from '@/lib/utils';
import {
  FormErrorLogProps,
  InterfaceErrorLog,
} from '@/interfaces/error.interface';
import { errorLog } from '@/lib/actions/error.actions';
import { InterfaceSerializedUser } from '@/interfaces/user.interface';

import validateErrorLog from '@/lib/validations/error.validation';

const FormErrorLog: FC<FormErrorLogProps> = ({ users }) => {
  const path = usePathname();

  const [input, setInput] = useState<InterfaceErrorLog>({
    name: undefined,
    description: undefined,
    user: undefined,
    path,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let _errors: Record<string, string> = {};

    const keys = Object.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const _error = validateErrorLog(keys[i], (input as any)[keys[i]]);
      const _key = Object.keys(_error)[0];
      const _val = Object.values(_error)[0];

      if (_key && _val) {
        _errors[_key] = _val;
      }
    }
    setErrors(_errors);

    if (Object.keys(_errors).length === 0) {
      errorLog(input);
      document?.getElementById('modal-log-error')?.click();
    }
  };

  useEffect(() => {
    setErrors(validateErrorLog('name', input.name));
  }, [input.name]);
  useEffect(() => {
    setErrors(validateErrorLog('description', input.description));
  }, [input.description]);
  useEffect(() => {
    setErrors(validateErrorLog('user', input.user));
  }, [input.user]);

  return (
    <form onSubmit={handleCreate}>
      <div className='row'>
        <div className='col-md-6 mb-2'>
          <label htmlFor='name' className='form-label'>
            Error Name
          </label>
          <input
            id='name'
            className='form-control'
            type='text'
            required={true}
            defaultValue={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          {errors.name && <small className='text-danger'>{errors.name}</small>}
        </div>

        <div className='col-md-6 mb-2'>
          <label htmlFor='user' className='form-label'>
            Assign to a User
          </label>
          <select
            id='user'
            className='form-select'
            defaultValue={input.user}
            onChange={(e) =>
              setInput({
                ...input,
                user: isWhiteSpaces(e.target.value)
                  ? undefined
                  : e.target.value,
              })
            }
          >
            <option value=' '></option>
            {users.map((record: InterfaceSerializedUser, index: number) => (
              <option key={`record-${index}`} value={record._id}>
                {record.name}
              </option>
            ))}
          </select>
          {errors.user && <small className='text-danger'>{errors.user}</small>}
        </div>

        <div className='col-md-12 mb-2'>
          <label htmlFor='description' className='form-label'>
            Error Description
          </label>
          <p>
            Describe the error, provide the error reproduction steps and paste
            the stack-trace if any is availlable
          </p>
          <textarea
            id='description'
            className='form-control'
            rows={5}
            required={true}
            defaultValue={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
          {errors.description && (
            <small className='text-danger'>{errors.description}</small>
          )}
        </div>
      </div>

      <button className='btn btn-primary float-end mb-0' type='submit'>
        Save
      </button>
    </form>
  );
};

export default FormErrorLog;
