import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct,
} from '../services/queries';

interface ProductBase {
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  sku: string;
  photoSrc: string;
}

interface ProductWithId extends ProductBase {
  id: string;
}

export const useFetchProducts = (params: {
  page: number, limit: number, sort: string, order: string, filter: string
}, initialData?: unknown) => (
  useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    initialData,
  })
);

export const useFetchProduct = (id: string) => useQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProductById(id),
  enabled: !!id,
});

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      console.log('Product added successfully');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (error) => {
      console.error('Error adding product:', error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...product }: ProductWithId) => updateProduct(id, product),
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
