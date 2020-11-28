import { NextFunction, Request, Response } from 'express';
import { NetResponse, netResponseStringValue, translate } from '../Constants/Constants';

export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.log('\nMiddleware - client errors = ', err.message);

  switch (err.message) {
    case netResponseStringValue(NetResponse.BAD_REQUEST_VALIDATION):
      res.sendStatus(translate(NetResponse.BAD_REQUEST_VALIDATION));
      break;
    case netResponseStringValue(NetResponse.INVALID):
      res.sendStatus(translate(NetResponse.INVALID));
      break;

    default:
      console.log('\nError type not found');
      next(err);
      break;
  }
}
