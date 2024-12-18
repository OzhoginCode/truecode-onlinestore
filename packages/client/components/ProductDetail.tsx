'use client';

import Head from 'next/head';
import { Card, Descriptions, Typography } from 'antd';
import { useFetchProduct } from '../hooks/useProducts';

const { Meta } = Card;
const { Text } = Typography;

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { data: product, error } = useFetchProduct(productId);

  if (error) return <div>Ошибка загрузки товара</div>;

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.photoSrc!} />
        <meta property="og:type" content="product" />
      </Head>
      <div style={{ padding: '20px' }}>
        <Card
          cover={(
            <img
              alt={product.name}
              src={product.photoSrc!}
              style={{
                height: 300,
                width: 300,
                objectFit: 'cover',
              }}
            />
          )}
        >
          <Meta title={product.name} description={product.description} />
        </Card>

        <Descriptions title="Детали товара" bordered layout="vertical" style={{ marginTop: '20px' }}>
          <Descriptions.Item label="Цена">
            <Text delete style={{ marginRight: '8px' }}>{product.price}</Text>
            <Text style={{ color: 'red' }}>{product.discountedPrice}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Артикул (SKU)">{product.sku}</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default ProductDetail;
