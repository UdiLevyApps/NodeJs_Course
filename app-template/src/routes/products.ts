import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import productData from '../assets/products.json';

interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemInStock: number;
}
const MIN_NAME_LENGTH = 3;
const INVALID = 409;
const SUCCESS = 200;
const SUCCESS_CREATION = 201;
const NO_CONTENT = 204;
const NO_FOUND = 404;
const BAD_REQUEST_VALIDATION = 400;

const products: Product[] = productData;

const routerProduct = Router();

const resolveProductPutNameHandler = (req: Request, res: Response, next: NextFunction): void => {
  const product = req.body as Product;
  if (product.name.length < MIN_NAME_LENGTH) {
    res.sendStatus(INVALID);
    return;
  }
  next();
};

routerProduct.all('/:id', (req, res, next) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productId.length != 36) {
    res.sendStatus(BAD_REQUEST_VALIDATION);
    return;
  }

  if (productIndex < 0) {
    res.sendStatus(NO_FOUND);
    return;
  }

  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];

  next();
});

routerProduct.get('/', (req, res) => res.status(SUCCESS).send(products));

routerProduct.post('/', resolveProductPutNameHandler, (req, res) => {
  const product = req.body as Product;
  product.id = generateId();
  products.push(product);
  res.status(SUCCESS_CREATION).send(product);
});

routerProduct.get('/:id', (req, res) => {
  res.status(SUCCESS).send(res.locals.product);
});

routerProduct.put('/:id', resolveProductPutNameHandler, (req, res) => {
  const product = req.body as Product;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);
  res.status(SUCCESS).send(res.locals.product);
});

routerProduct.delete('/:id', (req, res) => {
  products.splice(res.locals.productIndex, 1);
  res.sendStatus(NO_CONTENT);
});

export { routerProduct };
