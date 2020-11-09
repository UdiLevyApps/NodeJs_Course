import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { routerProduct as productRouter } from './routes/products';

const app = express();
app.use(express.json());
app.use(cors());

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log(' Press CTRL-C to stop\n');
});

app.use('/api/products', productRouter);


app.get('/', (req, res) => {
  res.send('hello back');
});

console.log('hello', uuidv4());
