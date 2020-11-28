import { NextFunction, Request, Response } from 'express';
import { getProductsAsync } from '../store/product-store';

export function getTheProducts(req: Request, res: Response, next: NextFunction): void {
  console.log('\nin Get The Products Promise');
  getProductsAsync()
    .then((products) => {
      res.locals.products = products;
      // next(new Error('Testing an next error'));
      next();
    })
    // .catch(err => next(err))
    .catch(next);
}
