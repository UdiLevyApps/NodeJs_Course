import { NextFunction, Request, Response } from 'express';
import { Product } from '../model/Product';
import { errorResponseMessage, NetResponse } from '../Constants/Constants';
import { validateIdLength, validNameLength } from '../validation/routeDataValidation';

export function middlewareValidateId(req: Request, res: Response, next: NextFunction): void {
  console.log('\nmiddleware ValidateId = ', req.params.id);
  if (!validateIdLength(req.params.id)) {
    console.log('\nProduct id not valid');
    throw errorResponseMessage(NetResponse.BAD_REQUEST_VALIDATION);
    // return next('router');
  }
  next();
}

export function middlewareValidateNameLength(req: Request, res: Response, next: NextFunction): void {
  console.log('\nmiddleware ValidateNameLength= ');
  const product = req.body as Product;
  if (!validNameLength(product.name)) {
    throw errorResponseMessage(NetResponse.INVALID);
  }
  next();
}
