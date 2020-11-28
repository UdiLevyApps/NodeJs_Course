import { Router } from 'express';
import { generateId } from '../utils/id-helper';
import { Product } from '../model/Product';
import { getTheProducts } from '../middleware/productsGetter';
import { NetResponse, translate } from '../Constants/Constants';
import { middlewareValidateId, middlewareValidateNameLength } from '../middleware/middlewareValidator';

const routerProduct = Router();

routerProduct.all('/:id', middlewareValidateId, getTheProducts, (req, res, next) => {
  console.log('\nin routerProduct all :id validation');
  const products: Product[] = res.locals.products;
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex < 0) {
    res.sendStatus(translate(NetResponse.NO_FOUND));
    return;
  }

  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];

  next();
});

routerProduct.get('/', getTheProducts, (req, res) => {
  console.log('\nin Get products');
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.products);
});

routerProduct.post('/', middlewareValidateNameLength, getTheProducts, (req, res) => {
  console.log('\nin Post product');
  const products: Product[] = res.locals.products;
  const product = req.body as Product;
  product.id = generateId();
  products.push(product);
  res.status(translate(NetResponse.SUCCESS_CREATION)).send(product);
});

routerProduct.get('/:id', (req, res) => {
  console.log('\nin Get product with ID');
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.product);
});

routerProduct.put('/:id', middlewareValidateNameLength, (req, res) => {
  console.log('\nin Put product ID');
  const product = req.body as Product;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.product);
});

routerProduct.delete('/:id', (req, res) => {
  console.log('\nin Delete product ID');
  const products: Product[] = res.locals.products;
  products.splice(res.locals.productIndex, 1);
  res.sendStatus(translate(NetResponse.NO_CONTENT));
});

export { routerProduct };
