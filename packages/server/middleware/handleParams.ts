import { Request, Response, NextFunction } from 'express';
import { LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';

import { FetchProductsParamsRaw } from '@truecode-onlinestore/shared';

const handleParams = (req: Request, res: Response, next: NextFunction) => {
  const {
    page,
    limit,
    sort = 'id',
    order = 'ASC',
    minPrice,
    maxPrice,
  } = req.query as FetchProductsParamsRaw;

  // фильтрация
  if (minPrice) {
    req.filterConditions = {
      discountedPrice: MoreThanOrEqual(minPrice),
    };
  }

  if (maxPrice) {
    req.filterConditions = {
      discountedPrice: LessThanOrEqual(maxPrice),
    };
  }

  if (minPrice && maxPrice) {
    req.filterConditions = {
      discountedPrice: And(MoreThanOrEqual(minPrice), LessThanOrEqual(maxPrice)),
    };
  }

  // пагинация
  req.paginationConditions = page && limit
    ? {
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }
    : {};

  // сортировка
  req.sortConditions = { [sort]: order.toUpperCase() as 'ASC' | 'DESC' };

  next();
};

export default handleParams;
