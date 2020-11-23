// import { Product } from '../model/Product';
const MIN_NAME_LENGTH = 3;
const ID_LENGTH = 36;

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
