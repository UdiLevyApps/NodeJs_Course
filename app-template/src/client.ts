import { createHttpClient } from './utils/http-client';
import { createLogger } from './utils/logger';

import { Product } from './model/Product';

const logger = createLogger('client-sample');

export async function makeCalls(baseUrl: string) {
  const productsClient = createHttpClient(`${baseUrl}/assets`);

  const list1 = await productsClient('/staticProducts.json').then((r) => r.json());
  logger.info(list1);

  // const newProduct: Product = {
  //   id: 'ed57ecc3-6d88-4cfa-bd7f-1fd70e23945f',
  //   categoryId: 'TEST-ed57ecc3-6d88-4cfa-bd7f-1f370e23934f',
  //   name: 'new prod',
  //   itemInStock: 3,
  // };

  // // "id": "ed57ecc3-6d88-4cfa-bd7f-1fd70e23943f",
  // // "categoryId": "ed57ecc3-6d88-4cfa-bd7f-1fd70e23934f",
  // // "name":"222",
  // // "itemInStock":4

  // await productsClient('/', {
  //   method: 'POST',
  //   body: JSON.stringify(newProduct),
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // const added = await productsClient('/3').then((r) => r.json());
  // logger.info(added);

  // const list2 = await productsClient('/').then((r) => r.json());
  // logger.info(list2);
}
