/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';

import AppDataSource from '../src/AppDataSource';
import Product from '../entity/Product';

export default (req: Request, res: Response, next: NextFunction) => {
  req.productRepo = AppDataSource.getRepository(Product);
  next();
};
