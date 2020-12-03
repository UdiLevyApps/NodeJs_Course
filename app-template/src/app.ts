import express from 'express';
import cors from 'cors';

import { apis, clients } from './routes';

// import { routerProduct as productRouter } from './routes/productsRouter';
// import { routerCategory as categoryRouter } from './routes/categoriesRouter';
import { clientErrorHandler } from './middleware/errors';
import { requestLog } from './middleware/request-log';
import { traceLogger, errorLogger } from './middleware/log';
import path from 'path';
import { initPassport } from './utils/passport';
import exphbs from 'express-handlebars';

initPassport();
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLog); // PRIVATE logger

// app.use(traceLogger());

// static file example will show the file by witing his path like
//http://localhost:8000/file.txt
// when using this in production we should make a copy of this to the build by
// 1 - install    "copyfiles": "^2.4.0",
// and inside packages.js the "scripts": should look like this - if the root filder is public
// "copy-files": "copyfiles -u 2 src/public/**/* dist/public",
// "build": "npm run build:clean && npm run build:run && npm run copy-files",

app.set('views', path.join(__dirname, 'views'));
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      increment: (v: number) => v + 1,
    },
  }),
);
app.set('view engine', 'handlebars');

app.use('/assets', express.static(path.join(__dirname, 'public')));

// app.use('/api/products', productRouter);
// app.use('/api/categories', categoryRouter);
// add foreach client app
clients.forEach((o) => app.use(`/app${o.prefix}`, o.router));
apis.forEach((o) => app.use(`/api${o.prefix}`, o.router));

app.get('/', (req, res) => {
  res.send('hello back');
});

// error middleware
// app.use(errorLogger());
app.use(clientErrorHandler);

export { app };
