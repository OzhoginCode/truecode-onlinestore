export default {
  products: () => '/products',
  product: (id: number) => `/products/${String(id)}`,
};
