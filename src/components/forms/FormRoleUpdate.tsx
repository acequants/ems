'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { roleUpdate } from '@/lib/actions/role.actions';
import { InterfaceRoleUpdateForm } from '@/interfaces/role.interface';

import validateRole from '@/lib/validations/role.validation';

const FormRoleUpdate: FC<InterfaceRoleUpdateForm> = ({ input, setInput }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let _errors: Record<string, string> = {};

    const keys = Object.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const _error = validateRole(keys[i], (input as any)[keys[i]]);
      const _key = Object.keys(_error)[0];
      const _val = Object.values(_error)[0];

      if (_key && _val) {
        _errors[_key] = _val;
      }
    }
    setErrors(_errors);

    if (Object.keys(_errors).length === 0) {
      roleUpdate(input);
    }
  };

  useEffect(() => {
    setErrors(validateRole('name', input.name));
  }, [input.name]);

  return (
    <form onSubmit={handleUpdate}>
      <div className='mb-2'>
        <label htmlFor='name' className='form-label'>
          Role Name
        </label>
        <input
          id='name'
          className='form-control'
          type='text'
          required={true}
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        {errors.name && <small className='text-danger'>{errors.name}</small>}
      </div>
      <button className='btn btn-primary float-end mb-0' type='submit'>
        Update
      </button>
    </form>
  );
};

export default FormRoleUpdate;
