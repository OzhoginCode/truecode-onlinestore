import { Repository } from 'typeorm';
import Product from '../entity/Product';

declare global {
  namespace Express {
    interface Request {
      productRepo: Repository<Product>;
      filterConditions?: Record<string, unknown>;
      paginationConditions?: { skip?: number; take?: number };
      sortConditions?: Record<string, 'ASC' | 'DESC'>;
    }
  }
}
