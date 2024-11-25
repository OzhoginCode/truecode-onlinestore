'use client';

import {
  Space, Pagination, Input, Select, Row, Col, Typography,
} from 'antd';
import { useState } from 'react';
import { useFetchProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const ProductGrid = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 8,
    sort: 'id',
    order: 'ASC',
    filter: '',
  });

  const { data, error, isFetching } = useFetchProducts(params);
  const { products, totalCount } = data || { products: [], totalCount: 0 };

  if (error) return <div>Error loading products</div>;

  const handlePageChange = (page: number, pageSize: number) => {
    setParams((prev) => ({ ...prev, page, limit: pageSize }));
  };

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split(':');
    setParams((prev) => ({ ...prev, sort, order }));
  };

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, filter: value, page: 1 }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={3}>Товары</Title>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="Поиск товаров"
              onSearch={handleSearch}
              allowClear
              style={{ width: 300 }}
            />
            <Select
              defaultValue="id:ASC"
              onChange={handleSortChange}
              style={{ width: 200 }}
            >
              <Option value="id:ASC">По ID (возр.)</Option>
              <Option value="id:DESC">По ID (убыв.)</Option>
              <Option value="price:ASC">По цене (возр.)</Option>
              <Option value="price:DESC">По цене (убыв.)</Option>
              <Option value="name:ASC">По имени (А-Я)</Option>
              <Option value="name:DESC">По имени (Я-А)</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      <Row justify="center" gutter={[16, 24]} style={{ minHeight: '500px' }}>
        {isFetching
          ? Array.from({ length: params.limit }, (_, index) => (
            <Col key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 300,
                height: 400,
                background: '#f0f0f0',
                borderRadius: '8px',
              }}
              />
            </Col>
          ))
          : products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
          ))}
      </Row>

      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={params.page}
        pageSize={params.limit}
        onChange={handlePageChange}
        total={totalCount}
        pageSizeOptions={['8']}
      />
    </div>
  );
};

export default ProductGrid;
