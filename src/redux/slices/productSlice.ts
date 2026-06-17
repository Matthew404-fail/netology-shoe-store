import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { api } from '../services/api';

type ProductState = {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  product: null,
  isLoading: false,
  error: null,
};

export const fetchProductById = createAsyncThunk<
  Product | string,
  string,
  { rejectValue: string }
>('product/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    return await api.getProductById(id);
  } catch (err) {
    let message = err instanceof Error ? err.message : 'Ошибка загрузки товара';
    if (typeof err === 'object' && err !== null && 'status' in err) {
      const status = err.status;
      if (typeof status === 'number') {
        if (status === 404) {
          message = 'Товар не найден';
        }
      }
    }

    return rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    resetProduct: (state) => {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;

        if (typeof action.payload === 'string') {
          state.product = null;
        } else {
          state.product = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { clearProductError, resetProduct } = productSlice.actions;
export default productSlice.reducer;
