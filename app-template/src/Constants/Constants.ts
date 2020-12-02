export enum NetResponse {
  INVALID = 409,
  SUCCESS = 200,
  SUCCESS_CREATION = 201,
  NO_CONTENT = 204,
  NO_FOUND = 404,
  BAD_REQUEST_VALIDATION = 400,
  UN_AUTHORIZED = 401, // some thing wrong with token , no token oor no valid token
  FORBIDDEN = 403, // user authenticated user but no authorized for this request
}

export function translate(x: NetResponse): number {
  switch (x) {
    case NetResponse.INVALID:
      console.log('\nError response - INVALID');
      break;

    case NetResponse.SUCCESS:
      console.log('\nSuccess response');
      break;

    case NetResponse.SUCCESS_CREATION:
      console.log('\nSuccess create response');
      break;

    case NetResponse.NO_CONTENT:
      console.log('\nSuccess response - NO_CONTENT');
      break;

    case NetResponse.NO_FOUND:
      console.log('\nError response - NO_FOUND');
      break;

    case NetResponse.BAD_REQUEST_VALIDATION:
      console.log('\nError response - BAD_REQUEST_VALIDATION');
      break;

    case NetResponse.UN_AUTHORIZED:
      console.log('\nError response - TOKEN MISSING OR INVALID');
      break;

    case NetResponse.FORBIDDEN:
      console.log('\nError response - FORBIDDEN TO USER');
      break;

    default:
      break;
  }
  return x;
}

export function netResponseStringValue(x: NetResponse): string {
  return '' + x;
}

export function errorResponseMessage(x: NetResponse): Error {
  return new Error(netResponseStringValue(x));
}

export const ID_LENGTH = 36;
export const MIN_NAME_LENGTH = 3;
