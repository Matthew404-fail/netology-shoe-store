import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FetchProductsParams, Product } from '../../types';
import { api } from '../services/api';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentOffset: number;
  activeCategoryId: number | null;
  searchQuery: string;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  hasMore: true,
  currentOffset: 0,
  activeCategoryId: null,
  searchQuery: '',
};

export const fetchProducts = createAsyncThunk<
  Product[],
  FetchProductsParams,
  { rejectValue: string }
>('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    return await api.getProducts(params);
  } catch {
    const message = 'Произошла ошибка при загрузке товаров';
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPagination: (state) => {
      state.currentOffset = 0;
      state.hasMore = true;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;

        if (action.meta.arg.offset === 0) {
          state.products = [];
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const newItems = action.payload;

        if (
          action.meta.arg.offset &&
          action.meta.arg.offset > 0 &&
          action.meta.arg.offset !== state.currentOffset
        ) {
          state.products = [...state.products, ...newItems];
        } else {
          state.products = newItems;
        }

        state.currentOffset = action.meta.arg.offset || 0;
        state.hasMore = newItems.length >= 6;

        state.activeCategoryId = action.meta.arg.categoryId ?? null;
        state.searchQuery = action.meta.arg.q || '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { clearError, resetPagination } = productsSlice.actions;
export default productsSlice.reducer;
