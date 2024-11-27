import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchProductOptions } from '../../../services/queryOptions';
import ProductDetail from '../../../components/ProductDetail';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(fetchProductOptions(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail productId={Number(id)} />
    </HydrationBoundary>
  );
};
export default ProductPage;
