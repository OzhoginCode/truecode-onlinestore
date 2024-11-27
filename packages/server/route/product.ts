import { promises as fsp } from 'fs';

import express, { Request, Response } from 'express';

import {
  CreateProductRequest, CreateProductResponse, DeleteProductResponse,
  GetProductResponse, GetProductsResponse, UpdateProductRequest,
  UpdateProductResponse, DeleteProductRequest, DeletePhotoRequest,
  DeletePhotoResponse, UpdatePhotoResponse,
} from '@truecode-onlinestore/shared/types';

import upload from '../middleware/upload';
import handleParams from '../middleware/handleParams';
import { getPhotoPath, formatProduct } from '../tools';

const productRouter = express.Router();

productRouter.get('/', handleParams, async (req: Request, res: Response<GetProductsResponse>) => {
  const [products, totalCount] = await req.productRepo.findAndCount({
    where: req.filterConditions,
    order: req.sortConditions,
    ...req.paginationConditions,
  });

  res.json({
    products: products.map(formatProduct),
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

  res.json(formatProduct(product));
});

productRouter.post('/', upload.single('photo'), async (req: Request<object, object, CreateProductRequest>, res: Response<CreateProductResponse>) => {
  const product = req.productRepo.create(req.body);

  if (req.file) {
    product.photoSrc = req.file.filename;
  }

  await req.productRepo.save(product);
  res.status(201).json({ id: product.id });
});

productRouter.put('/:id', async (req: Request<{ id: string }, object, UpdateProductRequest>, res: Response<UpdateProductResponse>) => {
  const { id } = req.params;
  await req.productRepo.update(id, req.body);
  res.json({ id: Number(id) });
});

productRouter.patch('/:id/photo', upload.single('photo'), async (req: Request<{ id: string }, object, UpdateProductRequest>, res: Response<UpdatePhotoResponse>) => {
  const { id } = req.params;

  const product = await req.productRepo.findOne({ where: { id: Number(id) } });

  if (!product || !req.file) {
    res.status(404).end();
    return;
  }

  if (product.photoSrc) {
    const oldPhotoPath = getPhotoPath(product.photoSrc);
    try {
      await fsp.unlink(oldPhotoPath);
    } catch {
      res.status(404).end();
      return;
    }
  }

  product.photoSrc = req.file.filename;

  await req.productRepo.save(product);
  res.status(200).json({ photoSrc: product.photoSrc });
});

productRouter.delete('/:id', async (req: Request<{ id: string }, object, DeleteProductRequest>, res: Response<DeleteProductResponse>) => {
  const { id } = req.params;

  const product = await req.productRepo.findOne({ where: { id: Number(id) } });

  if (!product?.photoSrc) {
    await req.productRepo.delete(id);
    res.json({ id: Number(id) });
    return;
  }

  const photoPath = getPhotoPath(product.photoSrc);

  try {
    await fsp.unlink(photoPath);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  await req.productRepo.delete(id);
  res.json({ id: Number(id) });
});

productRouter.delete('/:id/photo', async (req: Request<{ id: string }, object, DeletePhotoRequest>, res: Response<DeletePhotoResponse>) => {
  const { id } = req.params;

  const product = await req.productRepo.findOne({ where: { id: Number(id) } });

  if (!product?.photoSrc) {
    res.status(404).end();
    return;
  }

  const photoPath = getPhotoPath(product.photoSrc);

  try {
    await fsp.unlink(photoPath);
  } catch {
    res.status(404).end();
    return;
  }

  product.photoSrc = null;
  await req.productRepo.save(product);

  res.json({ id: Number(id) });
});

export default productRouter;
