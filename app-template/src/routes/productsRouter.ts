import { NextFunction, Request, Response, Router } from 'express';
import { generateId } from '../utils/id-helper';
import productData from '../assets/products.json';
import { Product } from '../model/Product';
import { validateIdLength, validNameLength } from '../validation/routeDataValidation';
import { NetResponse, translate } from '../Constants/Constants';

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
  if (!validNameLength(product.name)) {
    res.sendStatus(translate(NetResponse.INVALID));
    return;
  }
  next();
};

routerProduct.all('/:id', (req, res, next) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (!validateIdLength(req.params.id)) {
    res.sendStatus(translate(NetResponse.BAD_REQUEST_VALIDATION));
    return;
  }

  if (productIndex < 0) {
    res.sendStatus(translate(NetResponse.NO_FOUND));
    return;
  }

  res.locals.productIndex = productIndex;
  res.locals.product = products[productIndex];

  next();
});

routerProduct.get('/', (req, res) => res.status(translate(NetResponse.SUCCESS)).send(products));

routerProduct.post('/', resolveProductPutNameHandler, (req, res) => {
  const product = req.body as Product;
  product.id = generateId();
  products.push(product);
  res.status(translate(NetResponse.SUCCESS_CREATION)).send(product);
});

routerProduct.get('/:id', (req, res) => {
  res.status(SUCCESS).send(res.locals.product);
});

routerProduct.put('/:id', resolveProductPutNameHandler, (req, res) => {
  const product = req.body as Product;
  product.id = res.locals.product.id;
  Object.assign(res.locals.product, product);
  res.status(translate(NetResponse.SUCCESS)).send(res.locals.product);
});

routerProduct.delete('/:id', (req, res) => {
  products.splice(res.locals.productIndex, 1);
  res.sendStatus(translate(NetResponse.NO_CONTENT));
});

export { routerProduct };
