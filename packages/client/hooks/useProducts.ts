import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, FetchProductsParams } from '@truecode-onlinestore/shared/types';

import { createProduct, updateProduct, deleteProduct } from '../services/queries';
import { fetchProductsOptions, fetchProductOptions } from '../services/queryOptions';

export const useFetchProducts = (params: FetchProductsParams) => (
  useQuery(fetchProductsOptions(params))
);

export const useFetchProduct = (id: number) => useQuery(fetchProductOptions(id));

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...product }: Product) => updateProduct(id, product),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};
