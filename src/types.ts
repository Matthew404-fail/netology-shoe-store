export type NavbarLink = {
  label: string;
  link: string;
};

export type Category = {
  id: number | null;
  title: string;
};

export type FetchProductsParams = {
  categoryId?: number | null;
  offset?: number;
  q?: string;
};

export type ProductSize = {
  size: string;
  available: boolean;
};

export type Product = {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
  sku?: string;
  manufacturer?: string;
  color?: string;
  material?: string;
  reason?: string;
  season?: string;
  heelSize?: string;
  sizes?: ProductSize[];
};

export type OrderUserInfo = {
  phone: string;
  address: string;
};

export type OrderItem = {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
};

export type CreateOrder = {
  owner: OrderUserInfo;
  items: OrderItem[];
};
