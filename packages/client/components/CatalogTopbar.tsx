import {
  Space, InputNumber, Select, Row, Col, Typography,
} from 'antd';

const { Option } = Select;
const { Title } = Typography;

interface CatalogTopbarProps {
  handleChangeMinPrice: (value: number | null) => void;
  handleChangeMaxPrice: (value: number | null) => void;
  handleSelectSort: (value: string) => void;
  handleSelectOrder: (value: 'ASC' | 'DESC') => void;
}

const CatalogTopbar = ({
  handleChangeMinPrice, handleChangeMaxPrice, handleSelectSort, handleSelectOrder,
}: CatalogTopbarProps) => (
  <Row justify="space-between" align="middle">
    <Col>
      <Title level={2}>Товары</Title>
    </Col>
    <Col>
      <Space>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <span style={{ marginRight: '12px' }}>Цена, ₽</span>
          <InputNumber
            placeholder="От"
            min={0}
            style={{ marginRight: '8px' }}
            onChange={handleChangeMinPrice}
          />
          <InputNumber
            placeholder="До"
            min={0}
            onChange={handleChangeMaxPrice}
          />
          <span style={{ marginLeft: '12px' }}>Сортировка по:</span>
          <Select
            defaultValue="id"
            onChange={handleSelectSort}
            style={{ width: 100, margin: '12px' }}
          >
            <Option value="id">Новизне</Option>
            <Option value="price">Цене</Option>
            <Option value="name">Имени</Option>
          </Select>
          <Select
            defaultValue="ASC"
            onChange={handleSelectOrder}
          >
            <Option value="ASC">По возрастанию</Option>
            <Option value="DESC">По убыванию</Option>
          </Select>
        </Row>
      </Space>
    </Col>
  </Row>
);

export default CatalogTopbar;
