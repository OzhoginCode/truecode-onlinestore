import { Row, Col } from 'antd';

import { Product, FetchProductsParams } from '@truecode-onlinestore/shared';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
  isFetching: boolean;
  params: FetchProductsParams;
}

const ProductsGrid = ({ products, isFetching, params }: ProductsGridProps) => (
  <Row justify="center" gutter={[16, 24]} style={{ minHeight: '400px' }}>
    {isFetching
      ? Array.from({ length: Number(params.limit) }, (_, index) => (
        <Col key={index}>
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
);

export default ProductsGrid;
