'use client';

import { useState } from 'react';
import { Pagination, InputNumberProps } from 'antd';

import { FetchProductsParams, SortField, SortOrder } from '@truecode-onlinestore/shared';
import { useFetchProducts } from '../hooks/useProducts';
import fetchProductsDefaultParams from '../config/defaultParams';
import CatalogTopbar from './CatalogTopbar';
import ProductsGrid from './ProductsGrid';

const Catalog = () => {
  const [params, setParams] = useState<FetchProductsParams>(fetchProductsDefaultParams);

  const { data, error, isFetching } = useFetchProducts(params);
  const { products, totalCount } = data;

  if (error) return <div>Ошибка загрузки товаров</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setParams((prev) => ({ ...prev, page, limit: pageSize }));
  };

  const handleSelectSort = (sort: SortField) => setParams((prev) => ({ ...prev, sort }));
  const handleSelectOrder = (order: SortOrder) => setParams((prev) => ({ ...prev, order }));

  const handleChangeMinPrice: InputNumberProps['onChange'] = (minPrice) => {
    setParams((prev) => ({
      ...prev,
      minPrice: Number(minPrice),
    }));
  };

  const handleChangeMaxPrice: InputNumberProps['onChange'] = (maxPrice) => {
    setParams((prev) => ({
      ...prev,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    }));
  };

  return (
    <>
      <CatalogTopbar
        handleChangeMinPrice={handleChangeMinPrice}
        handleChangeMaxPrice={handleChangeMaxPrice}
        handleSelectSort={handleSelectSort}
        handleSelectOrder={handleSelectOrder}
      />

      <ProductsGrid
        products={products}
        isFetching={isFetching}
        params={params}
      />

      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={params.page}
        pageSize={params.limit}
        onChange={handlePageChange}
        total={totalCount}
        pageSizeOptions={['8']}
      />
    </>
  );
};

export default Catalog;
