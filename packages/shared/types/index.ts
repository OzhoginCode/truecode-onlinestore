export interface ProductBase {
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  sku: string;
  photoSrc?: string;
}

export interface Product extends ProductBase {
  id: number;
}

export interface PaginatedResponse {
  products: Product[];
  totalCount: number;
}

export type GetProductsResponse = PaginatedResponse;
export type GetProductResponse = Product;
export type CreateProductRequest = ProductBase;
export type CreateProductResponse = { id: number };
export type UpdateProductRequest = ProductBase;
export type UpdateProductResponse = { id: number };
export type DeleteProductResponse = { id: number };

export type SortOrder = 'ASC' | 'DESC';

export type SortField = 'id' | 'name' | 'discountedPrice';

export interface FetchProductsParamsRaw {
  page?: string;
  limit?: string;
  sort?: SortField;
  order?: SortOrder;
  minPrice?: string;
  maxPrice?: string;
}

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  sort?: SortField;
  order?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
}
