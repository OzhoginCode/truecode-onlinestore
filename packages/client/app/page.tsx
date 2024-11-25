import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchProducts } from '../services/queries';
import ProductGrid from '../components/ProductGrid';

const CatalogPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductGrid />
    </HydrationBoundary>
  );
};

export default CatalogPage;
