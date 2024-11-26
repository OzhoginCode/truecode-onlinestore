/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { useState } from 'react';
import {
  Avatar, List, Skeleton, Typography, Button,
} from 'antd';

import { Product } from '@truecode-onlinestore/shared';

import EditProductForm from '../../components/EditProductForm';
import CreateProductForm from '../../components/CreateProductForm';

import { useFetchProducts, useDeleteProduct } from '../../hooks/useProducts';

const { Text } = Typography;

const ManagePage = () => {
  const [editingProduct, setEditingProduct] = useState<null | Product>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data, error, isLoading } = useFetchProducts({});
  const deleteProduct = useDeleteProduct();

  if (error) return <div>Ошибка загрузки</div>;

  const { products } = data;

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsCreating(true)}
        style={{ marginBottom: 16 }}
      >
        Создать новый товар
      </Button>
      <List
        loading={isLoading}
        itemLayout="vertical"
        size="large"
        dataSource={products}
        renderItem={(product) => (
          <List.Item
            actions={[
              <a
                key="edit"
                href="#"
                onClick={() => setEditingProduct(product)}
                role="button"
                tabIndex={0}
              >
                редактировать
              </a>,
              <a
                key="delete"
                href="#"
                onClick={() => deleteProduct.mutate(product.id)}
                role="button"
                tabIndex={0}
              >
                удалить
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={<Avatar src={product.photoSrc} />}
                title={<a href={`/product/${String(product.id)}`}>{product.name}</a>}
                description={product.description}
              />
              <div>
                <Text strong>Цена: </Text>
                {product.discountedPrice ? (
                  <span style={{ color: 'red' }}>
                    <Text delete>{product.price}</Text> {product.discountedPrice}
                  </span>
                ) : (
                  <span>{product.price}</span>
                )}
              </div>
              <div>
                <Text strong>Артикул: </Text>{product.sku}
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
      {editingProduct && (
        <EditProductForm product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
      {isCreating && <CreateProductForm onClose={() => setIsCreating(false)} />}
    </>
  );
};

export default ManagePage;
