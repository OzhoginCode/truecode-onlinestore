/* eslint-disable no-console */
import express, { Express, Request, Response, NextFunction } from 'express';

import AppDataSource from './AppDataSource';
import productRouter from '../route/product';

export default () => {
  AppDataSource
    .initialize()
    .catch((error: unknown) => console.log(error));

  const app: Express = express();

  app.use(express.json());

  app.use('/products', productRouter);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).end();
  });

  return app;
};
