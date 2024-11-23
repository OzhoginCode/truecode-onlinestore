import express, { Express } from 'express';

import AppDataSource from './AppDataSource';

import productRepoMiddleware from '../middleware/productRepo';
import errorHandlerMiddleware from '../middleware/errorHandler';

import productRouter from '../route/product';

export default () => {
  AppDataSource
    .initialize()
    .catch((error: unknown) => console.log(error)); // eslint-disable-line no-console

  const app: Express = express();

  app.use(express.json());
  app.use(productRepoMiddleware);

  app.use('/products', productRouter);

  app.use(errorHandlerMiddleware);

  return app;
};
