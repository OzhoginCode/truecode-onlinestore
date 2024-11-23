import express, { Request, Response } from 'express';

import AppDataSource from '../src/AppDataSource';
import Product from '../entity/Product';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const products = await productRepo.find();
  res.json(products);
});

export default productRouter;
