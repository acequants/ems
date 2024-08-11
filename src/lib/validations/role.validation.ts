import { isWhiteSpaces } from '../utils';

export default function validateRole(field: string, value: any) {
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
  }
  return _errors;
}
