import type { CartItem, Product } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "carts",
    initialState: {items: [] as CartItem[]},
    reducers: {
        addToCart: (s, a: PayloadAction<Product>) => {
            const item = s.items.find(p => p.id === a.payload.id);
            item ? item.quantity++ : s.items.push({ ...a.payload, quantity: 1 })
        },
        updateQuantity: (s, a: PayloadAction<{id: string, delta: number}>) => {
            const item = s.items.find(p => p.id === a.payload.id)
            if(item && (item.quantity += a.payload.delta) <= 0) s.items = s.items.filter(c => c.id !== a.payload.id)
        },
        removeFromCart: (s, a: PayloadAction<string>) => {
            s.items =  s.items.filter(p => p.id !== a.payload)
        },
        clearCart: (s) => {s.items = []}
    }
})

export const {addToCart, updateQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer