export default {
  products: () => '/products',
  product: (id: string | number) => `/products/${String(id)}`,
};
