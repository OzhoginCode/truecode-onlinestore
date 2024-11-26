import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import fetchProductsDefaultParams from '../config/defaultParams';
import { fetchProductsOptions } from '../services/queryOptions';
import Catalog from '../components/Catalog';

const CatalogPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(fetchProductsOptions(fetchProductsDefaultParams));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog />
    </HydrationBoundary>
  );
};

export default CatalogPage;
