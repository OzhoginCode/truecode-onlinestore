'use client';

import { Card, Spin, Descriptions, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/queries';

const { Meta } = Card;
const { Text } = Typography;

interface ProductDetailProps {
  productId: string;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { data: product, error, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error loading product</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ width: '100%' }}
        cover={
          <img
            alt={product.name}
            src={product.photoSrc || 'https://via.placeholder.com/500'}
          />
        }
      >
        <Meta title={product.name} description={product.description} />
      </Card>

      <Descriptions title="Детали продукта" bordered layout="vertical" style={{ marginTop: '20px' }}>
        <Descriptions.Item label="Цена">
          {product.discountedPrice ? (
            <>
              <Text delete>{product.price}</Text> <Text style={{ color: 'red' }}>{product.discountedPrice}</Text>
            </>
          ) : (
            product.price
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Артикул (SKU)">{product.sku}</Descriptions.Item>
        {/* Добавьте дополнительные поля здесь */}
      </Descriptions>
    </div>
  );
};

export default ProductDetail;
