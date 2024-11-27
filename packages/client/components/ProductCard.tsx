'use client';

import Link from 'next/link';
import { Card, Typography } from 'antd';
import { Product } from '@truecode-onlinestore/shared';

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={`/product/${String(product.id)}`}>
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
          src={product.photoSrc!}
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
                height: '40px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '32px',
              }}
            >
              {product.description}
            </Text>
            <div>
              <Text delete style={{ marginRight: '8px' }}>{product.price}</Text>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>{product.discountedPrice}</Text>
            </div>
          </>
        )}
      />
    </Card>
  </Link>
);

export default ProductCard;
