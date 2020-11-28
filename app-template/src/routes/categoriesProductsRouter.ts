import { Router } from 'express';
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { getTheProducts } from '../middleware/productsGetter';
import { NetResponse, translate } from '../Constants/Constants';
import { middlewareValidateId } from '../middleware/middlewareValidator';
import { getTheCategorys } from '../middleware/categoryGetter';

const routerCategoryProducts = Router({ mergeParams: true });

routerCategoryProducts.all('/:descriptionForPrevId', middlewareValidateId, getTheCategorys, (req, res, next) => {
  console.log('\nin router Category Products all validation');
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

routerCategoryProducts.get('/products', getTheProducts, (req, res) => {
  console.log('\nin Get Category Products');
  const products: Product[] = res.locals.products;
  const filteredArray = products.filter((product) => {
    return product.categoryId == res.locals.category.id;
  });
  res.status(translate(NetResponse.SUCCESS)).send(filteredArray);
});

export { routerCategoryProducts };
