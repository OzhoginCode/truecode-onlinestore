import path from 'path';

import { Product } from '@truecode-onlinestore/shared';
import uploadsDir from '../storage/uploadsDir';

export const getPhotoPath = (photoSrc: string) => (
  path.join(uploadsDir, photoSrc)
);

export const formatProduct = (product: Product): Product => {
  if (!product.photoSrc) return product;

  return ({
    ...product,
    photoSrc: `/api/uploads/${product.photoSrc}`,
  });
};
