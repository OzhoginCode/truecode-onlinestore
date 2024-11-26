import { Product } from '@truecode-onlinestore/shared/types';

const formatProductPhotoSrc = (product: Product): Product => {
  if (!product.photoSrc) return product;

  return ({
    ...product,
    photoSrc: `/api${product.photoSrc}`,
  });
};

export default formatProductPhotoSrc;
