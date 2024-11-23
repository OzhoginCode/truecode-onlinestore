import { Repository } from 'typeorm';
import Product from '../entity/Product';

declare global {
  namespace Express {
    interface Request {
      productRepo: Repository<Product>;
    }
  }
}
