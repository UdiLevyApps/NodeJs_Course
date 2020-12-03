import express from 'express';
import { Category } from '../model/Category';
import { getTheCategorys } from '../middleware/categoryGetter';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { pageTitle: 'Login Page' });
});

router.get('/home', (req, res) => {
  res.render('home', { pageTitle: 'Welcome to Ticker App!' });
});

router.get('/categories', getTheCategorys, (req, res) => {
  const categorys: Category[] = res.locals.categories;

  // const projects = store.projects;
  res.render('categories', {
    pageTitle: 'Categories Page',
    categorys,
    helpers: {
      titleCase: (p: string) => p.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    },
  });
});

export default router;
