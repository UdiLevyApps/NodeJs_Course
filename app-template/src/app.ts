import express from 'express';
import cors from 'cors';
import { routerProduct as productRouter } from './routes/productsRouter';
import { routerCategory as categoryRouter } from './routes/categoriesRouter';
import { requestLog } from './middleware/request-log';
import { clientErrorHandler } from './middleware/errors';

const app = express();
app.use(express.json());
app.use(cors());

// Request start and end middleware
app.use(requestLog);

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => {
  res.send('hello back');
});

// error middleware
app.use(clientErrorHandler);

export { app };
