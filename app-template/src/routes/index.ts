// import projects from './categoriesProductsRouter';
import { routerCategory as categoryRouter } from './categoriesRouter';
import { routerProduct as productRouter } from './productsRouter';
import login from './login';
import clientapp from './clientapp';
export const clients = [
  {
    prefix: '/',
    router: clientapp,
  },
];
export const apis = [
  {
    prefix: '/categories',
    router: categoryRouter,
  },
  {
    prefix: '/products',
    router: productRouter,
  },
  {
    prefix: '/login',
    router: login,
  },
];
