import { Router } from 'express';
import { generateId } from '../utils/id-helper';
import { getTheCategorys } from '../middleware/categoryGetter';
import { Category } from '../model/Category';
import { NetResponse, translate } from '../Constants/Constants';
import { routerCategoryProducts } from '../routes/categoriesProductsRouter';
import { middlewareValidateId } from '../middleware/middlewareValidator';
import { createLogger } from '../utils/logger';

// const categorys: Category[] = getCategories();
const logger = createLogger('Categories');
const routerCategory = Router();

routerCategory.all('/:id', middlewareValidateId, getTheCategorys, (req, res, next) => {
  logger.info(`\nin router Category all :id ${req.params.id}`);
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
});

routerCategory.get('/', getTheCategorys, (req, res) => {
  logger.info('\nin Get Categories');
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.categories);
});

routerCategory.post('/', getTheCategorys, (req, res) => {
  logger.info('\nin Post Category');
  const categorys: Category[] = res.locals.categories;
  const category = req.body as Category;
  category.id = generateId();
  categorys.push(category);
  res.status(translate(NetResponse.SUCCESS_CREATION)).send(category);
});

routerCategory.get('/:id', (req, res) => {
  logger.info('\nin Get Category ID');
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.category);
});

routerCategory.put('/:id', (req, res) => {
  logger.info('\nin Put Category ID');
  const category = req.body as Category;
  category.id = res.locals.category.id;
  Object.assign(res.locals.category, category);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.category);
});

routerCategory.delete('/:id', getTheCategorys, (req, res) => {
  logger.info('\nin Delete Category ID');
  const categorys: Category[] = res.locals.categories;
  categorys.splice(res.locals.categoryIndex, 1);
  res.sendStatus(translate(NetResponse.NO_CONTENT));
});

routerCategory.use('/:id/', routerCategoryProducts);

export { routerCategory };
