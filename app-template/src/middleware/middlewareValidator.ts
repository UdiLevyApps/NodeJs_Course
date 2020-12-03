import { NextFunction, Request, Response } from 'express';
import { Product } from '../model/Product';
import { errorResponseMessage, NetResponse, translate } from '../Constants/Constants';
import { createLogger } from '../utils/logger';
import { productIdSchemaValidation, productNameSchemaValidation } from '../validation/joiValidators';
import { Category } from '../model/Category';

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

export function getSelectedProductWithId(req: Request, res: Response, next: NextFunction): void {
  const products: Product[] = res.locals.products;
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex < 0) {
    // const val = errorResponseMessage(NetResponse.NO_FOUND);
    throw errorResponseMessage(NetResponse.NO_FOUND);
    return;
  }

  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];

  next();
}

export function getSelectedCategoryWithId(req: Request, res: Response, next: NextFunction): void {
  const categorys: Category[] = res.locals.categories;
  const categoryId = req.params.id;
  const categoryIndex = categorys.findIndex((c) => c.id === categoryId);

  if (categoryIndex < 0) {
    res.sendStatus(translate(NetResponse.NO_FOUND));
    return;
  }

  res.locals.categoryIndex = categoryIndex;
  res.locals.category = categorys[categoryIndex];
  next();
}
