'use client';

import {
  InterfaceContextUser,
  InterfaceUserCreate,
} from '@/interfaces/user.interface';
import { FC, FormEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { handleFile, isWhiteSpaces } from '@/lib/utils';
import { userUpsert } from '@/lib/actions/user.actions';
import { roleFetchMany } from '@/lib/actions/role.actions';
import { InterfaceSerializedRole } from '@/interfaces/role.interface';
import { serializeRole } from '@/lib/serializations/role.serialize';

import Image from 'next/image';
import validateUserProfile from '@/lib/validations/user.validation';

const FormUserProfile: FC<InterfaceContextUser> = ({ user, btnLabel }) => {
  const router = useRouter();
  const path = usePathname();

  const [roles, setRoles] = useState<InterfaceSerializedRole[]>([]);
  const [tempImage, setTempImage] = useState<string>(user.image || '');
  const [input, setInput] = useState<InterfaceUserCreate>({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
    onboarded: true,
    path,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let _errors: Record<string, string> = {};

    const keys = Object.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const _error = validateUserProfile(keys[i], (input as any)[keys[i]]);
      const _key = Object.keys(_error)[0];
      const _val = Object.values(_error)[0];

      if (_key && _val) {
        _errors[_key] = _val;
      }
    }
    setErrors(_errors);

    if (Object.keys(_errors).length === 0) {
      userUpsert(input).then(() => {
        if (path === '/users/profile') {
          router.back();
        } else {
          router.push('/');
        }
      });
    }
  };

  useEffect(() => {
    roleFetchMany({}).then((data) => {
      if (data) {
        const records: InterfaceSerializedRole[] = [];

        for (let i = 0; i < data.records?.length; i++) {
          records.push(serializeRole(data.records[i]));
        }
        setRoles(records);
      }
    });
  }, []);
  useEffect(() => {
    setInput({ ...input, image: tempImage });
  }, [tempImage]);
  useEffect(() => {
    setErrors(validateUserProfile('name', input.name));
  }, [input.name]);
  useEffect(() => {
    setErrors(validateUserProfile('email', input.email));
  }, [input.email]);
  useEffect(() => {
    setErrors(validateUserProfile('role', input.role));
  }, [input.role]);
  useEffect(() => {
    setErrors(validateUserProfile('image', input.image));
  }, [input.image]);

  return (
    <>
      <div className='text-center w-80 m-auto'>
        <p className='text-muted mb-2'>
          Please fill in the form below to complete your profile
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='text-center'>
          <Image
            className='rounded-circle avatar-lg img-thumbnail'
            src={tempImage}
            alt=''
            width={50}
            height={50}
          />
        </div>

        <hr />

        <div className='row'>
          <div className='col-md-6 mb-2'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              className='form-control'
              type='text'
              id='name'
              required={true}
              defaultValue={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            {errors.name && (
              <small className='text-danger'>{errors.name}</small>
            )}
          </div>

          <div className='col-md-6 mb-2'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              className='form-control'
              type='email'
              id='email'
              required={true}
              defaultValue={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            {errors.email && (
              <small className='text-danger'>{errors.email}</small>
            )}
          </div>
        </div>

        <div className='mb-2'>
          <label htmlFor='role' className='form-label'>
            Role
          </label>
          <select
            id='role'
            className='form-select'
            defaultValue={input.role}
            onChange={(e) =>
              setInput({
                ...input,
                role: isWhiteSpaces(e.target.value)
                  ? undefined
                  : e.target.value,
              })
            }
          >
            <option value=' '></option>
            {roles.map((record: InterfaceSerializedRole, index: number) => (
              <option key={`record-${index}`} value={record._id}>
                {record.name}
              </option>
            ))}
          </select>
          {errors.role && <small className='text-danger'>{errors.role}</small>}
        </div>

        <div className='mb-2'>
          <label htmlFor='image' className='form-label'>
            Profile Photo
          </label>
          <input
            type='file'
            className='form-control'
            id='image'
            accept='image/*'
            onChange={(event) => handleFile(event, setTempImage)}
          />
          {errors.image && (
            <small className='text-danger'>{errors.image}</small>
          )}
        </div>
        <button className='btn btn-primary w-100 mb-0' type='submit'>
          {btnLabel}
        </button>
      </form>
    </>
  );
};

export default FormUserProfile;
