import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import * as actions from '../store/productSlice';
import { productApi } from '../api';
import { Product } from '../types';

export const useProducts = () => {
  const d = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector((s: RootState) => s.products);

  const fetchProducts = async () => {
    d(actions.setLoading(true));
    try { d(actions.setProducts((await productApi.getAll()).data)); }
    catch (e) { console.error(e); }
    finally { d(actions.setLoading(false)); }
  };

  const createProduct = async (data: Omit<Product, 'id'>) => {
    try { d(actions.addProduct((await productApi.create(data)).data)); return true; }
    catch { return false; }
  };

  const editProduct = async (name: string, data: Omit<Product, 'id'>) => {
    try { d(actions.updateProduct((await productApi.update(name, data)).data)); return true; }
    catch { return false; }
  };

  const deleteProduct = async (name: string) => {
    try { await productApi.delete(name); d(actions.removeProduct(name)); return true; }
    catch { return false; }
  };

  return {
    products: items, loading, selected, fetchProducts, createProduct, editProduct, deleteProduct,
    selectProduct: (p: Product | null) => d(actions.setSelected(p)),
  };
};
