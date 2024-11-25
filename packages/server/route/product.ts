import express, { Request, Response } from 'express';

import ProductBase from '../types/ProductBase';
import { getFilter, getPagination, formatProduct } from '../tools';
import upload from '../middleware/upload';

const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
  const {
    page, limit, sort = 'id', order = 'ASC', filter = '',
  } = req.query as Record<string, string>;

  const filterConditions = getFilter(filter);
  const paginationConditions = getPagination(page, limit);

  const allProducts = await req.productRepo.find();
  const products = await req.productRepo.find({
    where: filterConditions,
    order: { [sort]: order as 'ASC' | 'DESC' },
    ...paginationConditions,
  });

  res.json({ products: products.map(formatProduct), totalCount: allProducts.length });
});

productRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await req.productRepo.findOne({ where: { id: Number(id) } });

  if (!product) {
    res.status(404).end();
    return;
  }

  res.json(formatProduct(product));
});

productRouter.post('/', upload.single('photo'), async (req: Request<object, object, ProductBase>, res: Response) => {
  const product = req.productRepo.create(req.body);

  if (req.file) {
    product.photoSrc = `/uploads/${req.file.filename}`;
  }

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
