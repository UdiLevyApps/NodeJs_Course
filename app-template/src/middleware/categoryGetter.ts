import { NextFunction, Request, Response } from 'express';
import { getCategoriesAsync } from '../store/category-store';

export function getTheCategorys(req: Request, res: Response, next: NextFunction): void {
  console.log('\nin Get The Category Promise');
  getCategoriesAsync()
    .then((categories) => {
      res.locals.categories = categories;
      // next(new Error('Testing an next error'));
      next();
    })
    // .catch(err => next(err))
    .catch(next);
}
