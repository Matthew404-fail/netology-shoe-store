import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { CreateOrder, OrderItem } from '../../types';
import { api } from '../services/api';

const CART_STORAGE_KEY = 'cart_items';

const loadCartFromStorage = (): OrderItem[] => {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: OrderItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

type OrderState = {
  items: OrderItem[];
  isPending: boolean;
  submitError: string | null;
  isSuccess: boolean;
};

const initialState: OrderState = {
  items: loadCartFromStorage(),
  isPending: false,
  submitError: null,
  isSuccess: false,
};

export const submitOrder = createAsyncThunk<
  void,
  CreateOrder,
  { rejectValue: string }
>('order/submitOrder', async (payload, { rejectWithValue }) => {
  try {
    await api.createOrder(payload);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Ошибка оформления заказа';
    return rejectWithValue(message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderItem>) => {
      const newItem = action.payload;

      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].count += newItem.count;
      } else {
        state.items.push({ ...newItem });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (
      state,
      action: { payload: { id: number; size: string } }
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );
      saveCartToStorage(state.items);
    },

    updateItemCount: (
      state,
      action: { payload: { id: number; size: string; count: number } }
    ) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size
      );
      if (item) {
        item.count = Math.max(1, action.payload.count);
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(CART_STORAGE_KEY);
    },

    resetSubmitState: (state) => {
      state.isSuccess = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isPending = true;
        state.submitError = null;
        state.isSuccess = false;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.items = [];
        localStorage.removeItem(CART_STORAGE_KEY);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isPending = false;
        state.submitError = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateItemCount,
  clearCart,
  resetSubmitState,
} = orderSlice.actions;

export default orderSlice.reducer;
