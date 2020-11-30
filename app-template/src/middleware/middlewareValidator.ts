import { NextFunction, Request, Response } from 'express';
import { Product } from '../model/Product';
import { errorResponseMessage, NetResponse } from '../Constants/Constants';
import { createLogger } from '../utils/logger';
import { productIdSchemaValidation, productNameSchemaValidation } from '../validation/joiValidators';

const logger = createLogger('middleWare Validator');

export function middlewareValidateId(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nmiddleware ValidateId = ', req.params.id);
  const { error } = productIdSchemaValidation.validate(req.params.id);
  if (error) {
    logger.error('\nProduct id not valid');
    logger.error('\nJoi validator Error message' + error.message);
    throw errorResponseMessage(NetResponse.BAD_REQUEST_VALIDATION);
  }
  next();
}

export function middlewareValidateNameLength(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nmiddleware ValidateNameLength= ');
  const product = req.body as Product;
  const { error } = productNameSchemaValidation.validate(product.name);
  if (error) {
    logger.error('\nProduct name not valid');
    logger.error('\nJoi validator Error message' + error.message);
    throw errorResponseMessage(NetResponse.INVALID);
  }
  next();
}
