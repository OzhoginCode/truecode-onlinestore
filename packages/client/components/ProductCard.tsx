'use client';

import Link from 'next/link';
import { Card, Typography } from 'antd';

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({
  product,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    discountedPrice?: string;
    sku: string;
    photoSrc?: string;
  };
}) => (
  <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
    <Card
      hoverable
      style={{
        width: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      cover={(
        <img
          alt={product.name}
          src={product.photoSrc}
          style={{
            height: 200,
            objectFit: 'cover',
          }}
        />
      )}
    >
      <Meta
        title={(
          <Text strong style={{ fontSize: '16px' }}>
            {product.name}
          </Text>
        )}
        description={(
          <>
            <Text
              type="secondary"
              style={{
                display: 'block',
                height: '40px', // Фиксируем высоту блока описания
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '8px',
              }}
            >
              {product.description}
            </Text>
            <div>
              {product.discountedPrice ? (
                <>
                  <Text delete style={{ marginRight: '8px' }}>{product.price}</Text>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{product.discountedPrice}</Text>
                </>
              ) : (
                <Text style={{ fontWeight: 'bold' }}>{product.price}</Text>
              )}
            </div>
          </>
        )}
      />
    </Card>
  </Link>
);

export default ProductCard;
