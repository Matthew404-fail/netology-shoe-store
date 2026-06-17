import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '../../types';
import { api } from '../services/api';

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCategories();
      return [{ id: null, title: 'Все' }, ...data];
    } catch {
      const message = 'Произошла ошибка при загрузке категорий';

      return rejectWithValue(message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
