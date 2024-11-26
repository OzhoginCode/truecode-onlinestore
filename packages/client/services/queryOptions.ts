import { queryOptions } from '@tanstack/react-query';
import {
  GetProductsResponse, FetchProductsParams, GetProductResponse,
} from '@truecode-onlinestore/shared/types';

import { fetchProducts, fetchProductById } from './queries';

const emptyProductsResponse = { products: [], totalCount: 0 } as GetProductsResponse;
const emptyProductResponse = {
  name: '',
  description: '',
  price: 0,
  discountedPrice: 0,
  sku: '',
  photoSrc: '',
} as GetProductResponse;

export const fetchProductsOptions = (params: FetchProductsParams) => (
  queryOptions({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    initialData: emptyProductsResponse,
  })
);

export const fetchProductOptions = (id: number) => queryOptions({
  queryKey: ['product', id],
  queryFn: () => fetchProductById(id),
  initialData: emptyProductResponse,
});
