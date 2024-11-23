import { DataSource } from 'typeorm';
import Product from '../entity/Product';

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [Product],
  synchronize: true,
  logging: true,
});
