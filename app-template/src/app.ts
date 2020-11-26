import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { routerProduct as productRouter } from './routes/productsRouter';
import { routerCategory as categoryRouter } from './routes/categoriesRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => {
  res.send('hello back');
});

console.log('hello', uuidv4());

export { app };
