import express, { Request, Response } from 'express';

import ProductBase from '../types/ProductBase';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
  const products = await req.productRepo.find();
  res.json(products);
});

productRouter.post('/', async (req: Request<object, object, ProductBase>, res: Response) => {
  const product = req.productRepo.create(req.body);
  await req.productRepo.save(product);

  res.status(201).json({ id: product.id });
});

productRouter.put('/:id', async (req: Request<{ id: number }, object, ProductBase>, res: Response) => {
  const { id } = req.params;

  await req.productRepo.update(id, req.body);

  res.send({ id });
});

productRouter.delete('/:id', async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  await req.productRepo.delete(id);

  res.send({ id });
});

export default productRouter;
