import { Router } from 'express';
import { validateIdLength } from '../validation/routeDataValidation';
import categoryData from '../assets/categories.json';
import { Category } from '../model/Category';
import { NetResponse, translate } from '../Constants/Constants';

// import { Product } from '../model/Product';
// import productData from '../assets/products.json';
// const products: Product[] = productData;

const categorys: Category[] = categoryData;
const routerCategoryProducts = Router({ mergeParams: true });

routerCategoryProducts.all('/', (req, res, next) => {
  console.log('in routerCategoryProducts all validation');

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

// AVIAT I WAS EXCPECTING THIS NEXT METHOD TO RUN AFTER THE ALL CHECK ABOVE,
// BUT IT DOES NOT WHY?

// routerCategoryProducts.get('/products', (req, res) => {
//   console.log("in here")
//   const filteredArray = products.filter((product) => {
//     return product.categoryId == res.locals.category.id;
//   });
//   res.status(translate(NetResponse.SUCCESS)).send(filteredArray);
// });

// What is the diffrence betwen middleware and this handler ?
// function ->  (req: Request, res: Response, next: NextFunction): void => {

export { routerCategoryProducts };
