import { Router } from 'express';
import { validateIdLength } from '../validation/routeDataValidation';
import { getCategories } from '../store/category-store';
import { Category } from '../model/Category';
import { NetResponse, translate } from '../Constants/Constants';

import { Product } from '../model/Product';
import { getProducts } from '../store/product-store';

const products: Product[] = getProducts();
const categorys: Category[] = getCategories();

const routerCategoryProducts = Router({ mergeParams: true });

routerCategoryProducts.all('/:descriptionForPrevId', (req, res, next) => {
  console.log('in router Category Products all validation');

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

routerCategoryProducts.get('/products', (req, res) => {
  const filteredArray = products.filter((product) => {
    return product.categoryId == res.locals.category.id;
  });
  res.status(translate(NetResponse.SUCCESS)).send(filteredArray);
});

// What is the diffrence betwen middleware and this handler ?
// function ->  (req: Request, res: Response, next: NextFunction): void => {

export { routerCategoryProducts };
