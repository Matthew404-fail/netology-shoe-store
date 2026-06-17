import type {
  Category,
  CreateOrder,
  FetchProductsParams,
  Product,
} from '../../types';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:7070/api';

export const api = {
  /**
   * Хиты продаж
   */
  getTopSales: (): Promise<Product[]> =>
    fetch(`${BASE_URL}/top-sales`).then((res) => {
      if (!res.ok) throw { status: res.status };
      return res.json();
    }),

  /**
   * Список категорий
   */
  getCategories: (): Promise<Category[]> =>
    fetch(`${BASE_URL}/categories`).then((res) => {
      if (!res.ok) throw { status: res.status };
      return res.json();
    }),

  /**
   * Список товаров
   */
  getProducts: (params?: FetchProductsParams): Promise<Product[]> => {
    const url = new URL(`${BASE_URL}/items`);

    if (params?.categoryId !== undefined && params.categoryId !== null) {
      url.searchParams.set('categoryId', String(params.categoryId));
    }
    if (params?.offset !== undefined) {
      url.searchParams.set('offset', String(params.offset));
    }
    if (params?.q) {
      url.searchParams.set('q', params.q);
    }

    return fetch(url.toString()).then((res) => {
      if (!res.ok) throw { status: res.status };
      return res.json();
    });
  },

  /**
   * Получение товара по ID
   */
  getProductById: (id: string): Promise<Product> =>
    fetch(`${BASE_URL}/items/${id}`).then((res) => {
      if (!res.ok) throw { status: res.status };
      return res.json();
    }),

  /**
   * Оформление заказа
   */
  createOrder: (payload: CreateOrder) =>
    fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }
      return 'Заказ успешно оформлен';
    }),
};
