import type { Product } from "@/types"
import { createSlice, PayloadAction} from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: 'products',
    initialState: { items: [] as Product[], loading: false, selected: null as Product | null, filterd: [] as Product[]},
    reducers: {
        filterProduct: (s, a: PayloadAction<string>) => {
            if(!a.payload.trim().toLowerCase()) {
                s.filterd = s.items;
                return;
            }
            s.filterd = s.items.filter(p => p.name.trim().toLowerCase().includes(a.payload.trim().toLowerCase()))
        },
        setProducts: (s, a: PayloadAction<Product[]>) => { s.items = a.payload; s.filterd = a.payload},
        addProduct: (s, a: PayloadAction<Product>) => { s.items.push(a.payload); s.filterd.push(a.payload)},
        editProduct: (s, a: PayloadAction<Product>) => {
            const i = s.items.findIndex(p => String(p.id) === String(a.payload.id))
            if(i !== -1) s.items[i] = a.payload

            const id = s.filterd.findIndex(p => String(p.id) === String(a.payload.id))
            if(id !== -1) s.filterd[id] = a.payload
        },
        removeProduct: (s, a: PayloadAction<string>) => {
            s.items = s.items.filter(p => String(p.id) !== a.payload)
            s.filterd = s.filterd.filter(p => String(p.id) !== a.payload)
        },
        setLoading: (s, a: PayloadAction<boolean>) => {s.loading = a.payload},
        setSelected: (s, a: PayloadAction<Product | null>) => {s.selected = a.payload}
    }
})

export const {setProducts, filterProduct, addProduct, editProduct, removeProduct, setLoading, setSelected} = productSlice.actions;
export default productSlice.reducer
