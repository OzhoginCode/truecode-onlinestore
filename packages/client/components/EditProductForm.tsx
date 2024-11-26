'use client';

import { useState } from 'react';
import {
  Form, Input, InputNumber, Modal, Button,
} from 'antd';
import { Product, ProductBase } from '@truecode-onlinestore/shared';

import { useUpdateProduct } from '../hooks/useProducts';

interface EditProductFormProps {
  product: Product;
  onClose: () => void;
}

const EditProductForm = ({ product, onClose }: EditProductFormProps) => {
  const [form] = Form.useForm();
  const updateProduct = useUpdateProduct();
  const [loading, setLoading] = useState(false);

  const handleFinish = (values: ProductBase) => {
    setLoading(true);
    updateProduct.mutate(
      { id: product.id, ...values },
      {
        onSuccess: () => {
          setLoading(false);
          onClose();
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <Modal
      title={`Редактировать товар: ${product.name}`}
      open
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        initialValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          discountedPrice: product.discountedPrice,
          sku: product.sku,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="price"
          rules={[{ required: true, message: 'Введите цену товара' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          label="Цена со скидкой"
          name="discountedPrice"
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          label="Артикул (SKU)"
          name="sku"
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductForm;
