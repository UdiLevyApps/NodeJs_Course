enum NetResponse {
  INVALID = 409,
  SUCCESS = 200,
  SUCCESS_CREATION = 201,
  NO_CONTENT = 204,
  NO_FOUND = 404,
  BAD_REQUEST_VALIDATION = 400,
}

function translate(x: NetResponse): number {
  switch (x) {
    case NetResponse.INVALID:
      console.log('Error response - INVALID');
      break;

    case NetResponse.SUCCESS:
      console.log('Success response');
      break;

    case NetResponse.SUCCESS_CREATION:
      console.log('Success create response');
      break;

    case NetResponse.NO_CONTENT:
      console.log('Success response - NO_CONTENT');
      break;

    case NetResponse.NO_FOUND:
      console.log('Error response - NO_FOUND');
      break;

    case NetResponse.BAD_REQUEST_VALIDATION:
      console.log('Error response - BAD_REQUEST_VALIDATION');
      break;

    default:
      break;
  }
  return x;
}

export { NetResponse, translate };
