import { isWhiteSpaces } from '../utils';

export default function validateUserProfile(field: string, value: any) {
  let _errors: Record<string, string> = {};

  switch (field) {
    case 'name':
      if (!value || isWhiteSpaces(value)) {
        _errors['name'] = 'This field is required';
      } else {
        if (value.length > 255) {
          _errors['name'] = 'Maximum 255 characters';
        }
      }
      break;
    case 'email':
      if (!value || isWhiteSpaces(value)) {
        _errors['email'] = 'This field is required';
      } else {
        if (!/\S+@\S+\.\S+/.test(value)) {
          _errors['email'] = 'Invalid email address';
        }
        if (value.length > 255) {
          _errors['email'] = 'Maximum 255 characters';
        }
      }
      break;
    case 'role':
      if (!value || isWhiteSpaces(value)) {
        _errors['role'] = 'This field is required';
      } else {
        if (value.length > 255) {
          _errors['role'] = 'Maximum 255 characters';
        }
      }
      break;
    case 'image':
      if (value) {
        if (isWhiteSpaces(value)) {
          _errors['image'] = 'Can not be empty';
        }
      }
      break;
  }
  return _errors;
}
