import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchProductById } from '../../../services/queries';
import ProductDetail from '../../../components/ProductDetail';

interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params; // eslint-disable-line @typescript-eslint/await-thenable

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail productId={id} />
    </HydrationBoundary>
  );
};
export default ProductPage;
