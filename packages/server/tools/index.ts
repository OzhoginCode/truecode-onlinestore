import { Product } from '@truecode-onlinestore/shared/types';

const formatProductPhotoSrc = (product: Product): Product => {
  if (!product.photoSrc) return product;

  return ({
    ...product,
    photoSrc: `${String(process.env.PUBLIC_API_URL)}${product.photoSrc}`,
  });
};

export default formatProductPhotoSrc;
