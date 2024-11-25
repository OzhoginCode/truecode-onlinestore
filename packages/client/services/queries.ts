// api/products.ts
import client from './apiClient';
import paths from './paths';

interface ProductBase {
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  sku: string;
  photoSrc: string;
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  sku: string;
  photoSrc: string;
}

type Id = string | number;

export const fetchProducts = async (params: Record<string, string | number>) => {
  const { data } = await client.get<ProductBase[]>(paths.products(), { params });

  return data;
};

export const fetchProductById = async (id: Id) => {
  const { data } = await client.get<ProductBase>(paths.product(id));
  return data;
};

export const createProduct = async (product: ProductBase): Promise<ProductResponse> => {
  const { data } = await client.post<ProductResponse>(paths.products(), product);
  return data;
};

export const updateProduct = async (id: Id, product: ProductBase): Promise<ProductResponse> => {
  const { data } = await client.put<ProductResponse>(paths.product(id), product);
  return data;
};

export const deleteProduct = async (id: Id): Promise<{ id: Id }> => {
  console.log(id);
  const { data } = await client.delete<{ id: Id }>(paths.product(id));
  return data;
};
