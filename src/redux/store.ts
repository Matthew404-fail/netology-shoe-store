import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './slices/categoriesSlice';
import productReducer from './slices/productSlice';
import productsReducer from './slices/productsSlice';
import orderReducer from './slices/orderSlice';
import topSalesReducer from './slices/topSalesSlice';

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
