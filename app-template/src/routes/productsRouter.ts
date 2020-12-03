import { Router } from 'express';
import { generateId } from '../utils/id-helper';
import { Product } from '../model/Product';
import { getTheProducts } from '../middleware/productsGetter';
import { NetResponse, translate } from '../Constants/Constants';
import { getSelectedProductWithId, middlewareValidateId, middlewareValidateNameLength } from '../middleware/middlewareValidator';
import { createLogger } from '../utils/logger';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../model/credentials';

const logger = createLogger('Products');

const routerProduct = Router();

routerProduct.all('*', authenticate(), (req, res, next) => {
  // console.log('\nin routerProduct all :id ');

  logger.info(`\nWinston Logger - in ALL authenticate `);
  next();
});

routerProduct.all('/:id', middlewareValidateId, getTheProducts, getSelectedProductWithId, (req, res, next) => {
  next();
});

routerProduct.get('/', getTheProducts, (req, res) => {
  // console.log('\nin Get products');
  logger.info(`\nWinston Logger - in Get products `);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.products);
});

routerProduct.post('/', authorize(UserRole.Admin), middlewareValidateNameLength, getTheProducts, (req, res) => {
  logger.info('\nin Post product');
  const products: Product[] = res.locals.products;
  const product = req.body as Product;
  product.id = generateId();
  products.push(product);
  res.status(translate(NetResponse.SUCCESS_CREATION)).send(product);
});

routerProduct.get('/:id', (req, res) => {
  logger.info('\nin Get product with ID');
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.product);
});

routerProduct.put('/:id', authorize(UserRole.Admin), middlewareValidateNameLength, (req, res) => {
  logger.info('\nin Put product ID');
  const product = req.body as Product;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.product);
});

routerProduct.delete('/:id', authorize(UserRole.Admin), (req, res) => {
  logger.info('\nin Delete product ID');
  const products: Product[] = res.locals.products;
  products.splice(res.locals.productIndex, 1);
  res.sendStatus(translate(NetResponse.NO_CONTENT));
});

export { routerProduct };
