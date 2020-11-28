import express from 'express';
import cors from 'cors';
import { routerProduct as productRouter } from './routes/productsRouter';
import { routerCategory as categoryRouter } from './routes/categoriesRouter';
import { clientErrorHandler } from './middleware/errors';
import { requestLog } from './middleware/request-log';
import { traceLogger, errorLogger } from './middleware/log';

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLog); // PRIVATE logger

app.use(traceLogger());

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => {
  res.send('hello back');
});
// error middleware
app.use(errorLogger());
app.use(clientErrorHandler);

export { app };
