import express, { Request, Response } from 'express';

import {
  CreateProductRequest, CreateProductResponse, DeleteProductResponse,
  GetProductResponse, GetProductsResponse, UpdateProductRequest,
  UpdateProductResponse,
} from '@truecode-onlinestore/shared/types';

import upload from '../middleware/upload';
import handleParams from '../middleware/handleParams';

const productRouter = express.Router();

productRouter.get('/', handleParams, async (req: Request, res: Response<GetProductsResponse>) => {
  const [products, totalCount] = await req.productRepo.findAndCount({
    where: req.filterConditions,
    order: req.sortConditions,
    ...req.paginationConditions,
  });

  res.json({
    products,
    totalCount,
  });
});

productRouter.get('/:id', async (req: Request<{ id: string }>, res: Response<GetProductResponse>) => {
  const { id } = req.params;
  const product = await req.productRepo.findOne({ where: { id: Number(id) } });

  if (!product) {
    res.status(404).end();
    return;
  }

  res.json(product);
});

productRouter.post('/', upload.single('photo'), async (req: Request<object, object, CreateProductRequest>, res: Response<CreateProductResponse>) => {
  const product = req.productRepo.create(req.body);

  if (req.file) {
    product.photoSrc = `/api/uploads/${req.file.filename}`;
  }

  await req.productRepo.save(product);
  res.status(201).json({ id: product.id });
});

productRouter.put('/:id', async (req: Request<{ id: string }, object, UpdateProductRequest>, res: Response<UpdateProductResponse>) => {
  const { id } = req.params;
  await req.productRepo.update(id, req.body);
  res.send({ id: Number(id) });
});

productRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response<DeleteProductResponse>) => {
  const { id } = req.params;
  await req.productRepo.delete(id);
  res.send({ id: Number(id) });
});

export default productRouter;
