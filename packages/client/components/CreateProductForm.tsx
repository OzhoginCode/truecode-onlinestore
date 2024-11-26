'use client';

import { useState } from 'react';
import {
  Form, Input, InputNumber, Modal, Button, Upload,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';

import { Product } from '@truecode-onlinestore/shared';
import { useCreateProduct } from '../hooks/useProducts';

interface CreateProductFormProps {
  onClose: () => void;
}

const CreateProductForm = ({ onClose }: CreateProductFormProps) => {
  const [form] = Form.useForm();
  const createProduct = useCreateProduct();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFinish = (values: Product) => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('discountedPrice', values.discountedPrice.toString());
    formData.append('sku', values.sku);
    formData.append('photo', file);

    createProduct.mutate(formData, {
      onSuccess: () => {
        setLoading(false);
        onClose();
        form.resetFields();
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleFileChange = (info: UploadChangeParam) => {
    setFile(info.file.originFileObj as File);
  };

  return (
    <Modal
      title="Создать новый товар"
      open
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        initialValues={{
          name: '',
          description: '',
          price: null,
          discountedPrice: null,
          sku: '',
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
          rules={[{ required: true, message: 'Введите описание товара' }]}
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
          rules={[{ required: true, message: 'Введите цену товара' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item
          label="Артикул (SKU)"
          name="sku"
          rules={[{ required: true, message: 'Введите артикул товара' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Фотография"
          name="photo"
          rules={[{ required: true, message: 'Загрузите фотографию товара' }]}
        >
          <Upload
            name="photo"
            listType="picture"
            accept="image/*"
            beforeUpload={setFile}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Загрузить фотографию</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Создать товар
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductForm;
