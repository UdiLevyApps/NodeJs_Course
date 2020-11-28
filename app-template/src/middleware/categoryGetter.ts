import { NextFunction, Request, Response } from 'express';
import { getCategoriesAsync } from '../store/category-store';
import { createLogger } from '../utils/logger';

const logger = createLogger('Middleware getTheCategorys');

export function getTheCategorys(req: Request, res: Response, next: NextFunction): void {
  logger.info('\nin Get The Category Promise');
  getCategoriesAsync()
    .then((categories) => {
      res.locals.categories = categories;
      // next(new Error('Testing an CATEGORY next error'));
      next();
    })
    // .catch(err => next(err))
    .catch(next);
}
