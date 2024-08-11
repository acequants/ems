import { isWhiteSpaces } from '../utils';

export default function validateErrorLog(field: string, value: any) {
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
    case 'description':
      if (!value || isWhiteSpaces(value)) {
        _errors['description'] = 'This field is required';
      }
      break;
    case 'user':
      if (value) {
        if (isWhiteSpaces(value)) {
          _errors['user'] = 'Can not be empty';
        }
      }
      break;
  }
  return _errors;
}
