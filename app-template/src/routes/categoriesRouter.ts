import { Router } from 'express';
import { generateId } from '../utils/id-helper';
import { getCategories } from '../store/category-store';
import { Category } from '../model/Category';
import { validateIdLength } from '../validation/routeDataValidation';
import { NetResponse, translate } from '../Constants/Constants';
import { routerCategoryProducts } from '../routes/categoriesProductsRouter';

const categorys: Category[] = getCategories();

const routerCategory = Router();

routerCategory.all('/:id', (req, res, next) => {
  console.log('in router Category all validation');

  const categoryId = req.params.id;
  const categoryIndex = categorys.findIndex((c) => c.id === categoryId);

  if (!validateIdLength(req.params.id)) {
    res.sendStatus(translate(NetResponse.BAD_REQUEST_VALIDATION));
    return;
  }

  if (categoryIndex < 0) {
    res.sendStatus(translate(NetResponse.NO_FOUND));
    return;
  }

  res.locals.categoryIndex = categoryIndex;
  res.locals.category = categorys[categoryIndex];

  next();
});

routerCategory.get('/', (req, res) => res.status(translate(NetResponse.SUCCESS)).send(categorys));

routerCategory.post('/', (req, res) => {
  const category = req.body as Category;
  category.id = generateId();
  categorys.push(category);
  res.status(translate(NetResponse.SUCCESS_CREATION)).send(category);
});

routerCategory.get('/:id', (req, res) => {
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.category);
});

routerCategory.put('/:id', (req, res) => {
  const category = req.body as Category;
  category.id = res.locals.category.id;
  Object.assign(res.locals.category, category);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.category);
});

routerCategory.delete('/:id', (req, res) => {
  categorys.splice(res.locals.categoryIndex, 1);
  res.sendStatus(translate(NetResponse.NO_CONTENT));
});

routerCategory.use('/:id/', routerCategoryProducts);

export { routerCategory };