export enum NetResponse {
  INVALID = 409,
  SUCCESS = 200,
  SUCCESS_CREATION = 201,
  NO_CONTENT = 204,
  NO_FOUND = 404,
  BAD_REQUEST_VALIDATION = 400,
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
