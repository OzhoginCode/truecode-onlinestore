import { ILike } from 'typeorm';

export const getFilter = (filter?: string) => {
  if (!filter) return {};
  return { name: ILike(`%${filter}%`) };
};

export const getPagination = (page: string | undefined, limit: string | undefined) => {
  if (!page || !limit) return {};
  return {
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  };
};

export const formatProduct = (product: { photoSrc: string }) => ({
  ...product,
  photoSrc: `${String(process.env.PUBLIC_API_URL)}${product.photoSrc}`,
});
