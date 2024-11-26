import {
  GetProductsResponse, GetProductResponse,
  CreateProductResponse, UpdateProductRequest, UpdateProductResponse,
  DeleteProductResponse, FetchProductsParams,
} from '@truecode-onlinestore/shared/types';

import client from './apiClient';
import paths from './paths';

export const fetchProducts = async (params: FetchProductsParams) => {
  const { data } = await client.get<GetProductsResponse>(paths.products(), { params });
  return data;
};

export const fetchProductById = async (id: number) => {
  const { data } = await client.get<GetProductResponse>(paths.product(id));
  return data;
};

export const createProduct = async (product: FormData) => {
  const { data } = await client.post<CreateProductResponse>(paths.products(), product);
  return data;
};

export const updateProduct = async (id: number, product: UpdateProductRequest) => {
  const { data } = await client.put<UpdateProductResponse>(paths.product(id), product);
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await client.delete<DeleteProductResponse>(paths.product(id));
  return data;
};
