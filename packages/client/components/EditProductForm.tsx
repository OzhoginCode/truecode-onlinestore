import { useState } from 'react';
import {
  Form, Input, InputNumber, Modal, Button, Upload, message,
} from 'antd';
import { Product, ProductBase } from '@truecode-onlinestore/shared';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

import { useUpdateProduct, useUpdatePhoto, useDeletePhoto } from '../hooks/useProducts';

interface EditProductFormProps {
  product: Product;
  onClose: () => void;
}

const EditProductForm = ({ product, onClose }: EditProductFormProps) => {
  const [form] = Form.useForm();
  const updateProduct = useUpdateProduct();
  const updatePhoto = useUpdatePhoto();
  const deletePhoto = useDeletePhoto();
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

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

  const handlePhotoUpload = async (file: File) => {
    setPhotoLoading(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      await updatePhoto.mutateAsync({ id: product.id, photoSrc: formData });
      message.success('Фото обновлено');
      onClose();
    } catch {
      message.error('Ошибка при загрузке фото');
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleDeletePhoto = () => {
    deletePhoto.mutate(product.id, {
      onSuccess: () => {
        message.success('Фото удалено');
        onClose();
      },
      onError: () => {
        message.error('Ошибка при удалении фото');
      },
    });
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
          rules={[{ required: true, message: 'Введите цену товара со скидкой' }]}
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

        <Form.Item label="Фото товара">
          <div>
            {product.photoSrc ? (
              <img
                src={product.photoSrc}
                alt="Товар"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
              />
            ) : (
              <p>Фото не загружено</p>
            )}
            {product.photoSrc && (
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                loading={photoLoading}
                onClick={handleDeletePhoto}
              >
                Удалить фото
              </Button>
            )}
            <Upload
              accept="image/*"
              beforeUpload={async (file) => {
                await handlePhotoUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                loading={photoLoading}
                disabled={photoLoading}
              >
                Загрузить новое фото
              </Button>
            </Upload>
          </div>
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
