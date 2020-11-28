import { NextFunction, Request, Response } from 'express';
import { getProductsAsync } from '../store/product-store';
import { createLogger } from '../utils/logger';

const logger = createLogger('Middleware getTheProducts');

export function getTheProducts(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nin Get The Products Promise');
  getProductsAsync()
    .then((products) => {
      res.locals.products = products;
      // next(new Error('Testing an next error'));
      next();
    })
    // .catch(err => next(err))
    .catch(next);
}
