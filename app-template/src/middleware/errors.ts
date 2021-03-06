import { NextFunction, Request, Response } from 'express';
import { NetResponse, netResponseStringValue, translate } from '../Constants/Constants';
import { createLogger } from '../utils/logger';

const logger = createLogger('client Error Handler');

export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('\nMiddleware - client errors = ', err.message);

  switch (err.message) {
    case netResponseStringValue(NetResponse.BAD_REQUEST_VALIDATION):
      res.sendStatus(translate(NetResponse.BAD_REQUEST_VALIDATION));
      break;
    case netResponseStringValue(NetResponse.INVALID):
      res.sendStatus(translate(NetResponse.INVALID));
      break;

    case netResponseStringValue(NetResponse.UN_AUTHORIZED):
      res.sendStatus(translate(NetResponse.UN_AUTHORIZED));
      break;

    case netResponseStringValue(NetResponse.FORBIDDEN):
      res.sendStatus(translate(NetResponse.FORBIDDEN));
      break;

    case netResponseStringValue(NetResponse.NO_FOUND):
      res.sendStatus(translate(NetResponse.NO_FOUND));
      break;

    default:
      logger.error('\nError type not found');
      next(err);
      break;
  }
}
