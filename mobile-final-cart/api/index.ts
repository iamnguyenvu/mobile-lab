import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://67d53cb6d2c7857431efc348.mockapi.io/travel-app/api/products';

const api = axios.create({ baseURL: API_URL });

export const productApi = {
  getAll: () => api.get<Product[]>(''),
  create: (data: Omit<Product, 'id'>) => api.post<Product>('', data),
  update: (id: string, data: Omit<Product, 'id'>) => api.put<Product>(`/${id}`, data),
  delete: (id: string) => api.delete(`/${id}`),
};
