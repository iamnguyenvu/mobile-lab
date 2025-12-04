import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], loading: false, selected: null as Product | null },
  reducers: {
    setProducts: (s, a: PayloadAction<Product[]>) => { s.items = a.payload; },
    addProduct: (s, a: PayloadAction<Product>) => { s.items.push(a.payload); },
    updateProduct: (s, a: PayloadAction<Product>) => {
      const i = s.items.findIndex(p => p.name === a.payload.name);
      if (i !== -1) s.items[i] = a.payload;
    },
    removeProduct: (s, a: PayloadAction<string>) => {
      s.items = s.items.filter(p => p.name !== a.payload);
    },
    setLoading: (s, a: PayloadAction<boolean>) => { s.loading = a.payload; },
    setSelected: (s, a: PayloadAction<Product | null>) => { s.selected = a.payload; },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct, setLoading, setSelected } = productSlice.actions;
export default productSlice.reducer;
