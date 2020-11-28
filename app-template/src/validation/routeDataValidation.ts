import { ID_LENGTH, MIN_NAME_LENGTH } from '../Constants/Constants';

function validateIdLength(id: string): boolean {
  if (id.length != ID_LENGTH) {
    return false;
  }
  return true;
}

function validNameLength(name: string): boolean {
  if (name.length < MIN_NAME_LENGTH) {
    return false;
  }
  return true;
}

export { validateIdLength, validNameLength };
