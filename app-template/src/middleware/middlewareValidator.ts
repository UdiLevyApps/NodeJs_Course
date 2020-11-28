import { NextFunction, Request, Response } from 'express';
import { Product } from '../model/Product';
import { errorResponseMessage, NetResponse } from '../Constants/Constants';
import { validateIdLength, validNameLength } from '../validation/routeDataValidation';
import { createLogger } from '../utils/logger';

const logger = createLogger('middleWare Validator');

export function middlewareValidateId(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nmiddleware ValidateId = ', req.params.id);
  if (!validateIdLength(req.params.id)) {
    console.log('\nProduct id not valid');
    throw errorResponseMessage(NetResponse.BAD_REQUEST_VALIDATION);
    // return next('router');
  }
  next();
}

export function middlewareValidateNameLength(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nmiddleware ValidateNameLength= ');
  const product = req.body as Product;
  if (!validNameLength(product.name)) {
    throw errorResponseMessage(NetResponse.INVALID);
  }
  next();
}
