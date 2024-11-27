export default {
  products: () => '/products',
  product: (id: number) => `/products/${String(id)}`,
  productPhoto: (id: number) => `/products/${String(id)}/photo`,
};
