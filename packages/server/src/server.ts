import express, { Express } from 'express';
import morgan from 'morgan';

import AppDataSource from './AppDataSource';

import productRepoMiddleware from '../middleware/productRepo';
import errorHandlerMiddleware from '../middleware/errorHandler';

import productRouter from '../route/product';
import uploadDir from '../storage/uploadsDir';

export default () => {
  AppDataSource
    .initialize()
    .catch((error: unknown) => console.log(error)); // eslint-disable-line no-console

  const app: Express = express();

  app.use(express.json());
  app.use(morgan('short'));
  app.use(productRepoMiddleware);

  app.use('/api/products', productRouter);
  app.use('/api/uploads', express.static(uploadDir));

  app.use(errorHandlerMiddleware);

  return app;
};
