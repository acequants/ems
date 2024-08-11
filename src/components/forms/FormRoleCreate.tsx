'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { InterfaceRoleCreate } from '@/interfaces/role.interface';
import { roleCreate } from '@/lib/actions/role.actions';

import validateRole from '@/lib/validations/role.validation';

const FormRoleCreate: FC = () => {
  const path = usePathname();

  const [input, setInput] = useState<InterfaceRoleCreate>({
    path,
    name: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      roleCreate(input);
    }
  };

  useEffect(() => {
    setErrors(validateRole('name', input.name));
  }, [input.name]);

  return (
    <form onSubmit={handleCreate}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Role Name
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
      <button className='btn btn-primary float-end mb-0' type='submit'>
        Create
      </button>
    </form>
  );
};

export default FormRoleCreate;
