import { AppDispatch, type RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/productSlice"
import type { Product } from "@/types"
import { productApi} from "@/api"

export const useProducts = () => {
    const d = useDispatch<AppDispatch>()
    const { filterd, items, loading, selected} = useSelector((s: RootState) => s.products)
    const fetchProducts = async () => {
        d(actions.setLoading(true))
        try { d(actions.setProducts((await productApi.getAll()).data))}
        catch (e) { console.error(e);
        }
        finally {d(actions.setLoading(false))}
    }

    const createProduct = async (data: Omit<Product, 'id'>) => {
        try { d(actions.addProduct((await productApi.create(data)).data)); return true}
        catch {return false}
    }

    const editProduct = async (id: string, data: Omit<Product, 'id'>) => {
        try {d(actions.editProduct((await productApi.update(id, data)).data)); return true}
        catch {return false}
    }

    const deleteProduct = async (id: string) => {
        try {await productApi.remove(id); d(actions.removeProduct(id)); return true}
        catch {return false}
    }

    const searchProduct = (search: string) => {
        d(actions.filterProduct(search))
    }

    return {
        products: filterd.length ? filterd : items, loading, selected, fetchProducts, createProduct, editProduct, deleteProduct, searchProduct,
        selectProduct: (p: Product | null) => d(actions.setSelected(p)) 
    }
}