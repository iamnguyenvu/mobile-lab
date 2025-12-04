import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types';

const initialState: { items: CartItem[] } = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: p }: PayloadAction<Product>) => {
      const idx = state.items.findIndex(i => i.name === p.name);
      idx >= 0 ? state.items[idx].quantity++ : state.items.push({ ...p, quantity: 1 });
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.name !== payload);
    },
    updateQuantity: (state, { payload: { name, delta } }: PayloadAction<{ name: string; delta: number }>) => {
      const item = state.items.find(i => i.name === name);
      if (item && (item.quantity += delta) <= 0) state.items = state.items.filter(i => i.name !== name);
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
