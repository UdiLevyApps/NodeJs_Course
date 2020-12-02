// import projects from './categoriesProductsRouter';
import { routerCategory as categoryRouter } from './categoriesRouter';
import { routerProduct as productRouter } from './productsRouter';
import login from './login';

export default [
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
