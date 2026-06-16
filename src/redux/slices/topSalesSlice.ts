import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { api } from '../services/api';

type TopSalesState = {
  items: Product[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TopSalesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchTopSales = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('topSales/fetchTopSales', async (_, { rejectWithValue }) => {
  try {
    return await api.getTopSales();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Ошибка загрузки хитов продаж';
    return rejectWithValue(message);
  }
});

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const { clearError } = topSalesSlice.actions;
export default topSalesSlice.reducer;
