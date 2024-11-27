import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';

import fetchProductsDefaultParams from '../config/defaultParams';
import { fetchProductsOptions } from '../services/queryOptions';
import Catalog from '../components/Catalog';

const CatalogPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(fetchProductsOptions(fetchProductsDefaultParams));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Head>
        <title>Каталог товаров</title>
        <meta name="description" content="Каталог всех существующих в мире товаров" />
        <meta property="og:title" content="Каталог товаров" />
        <meta property="og:description" content="Каталог всех существующих в мире товаров" />
        <meta property="og:type" content="website" />
      </Head>
      <Catalog />
    </HydrationBoundary>
  );
};

export default CatalogPage;
