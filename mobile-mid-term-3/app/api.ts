import axios from "axios"
import { Product } from "./types"

const BASE_URL = "https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1/"
const URL = "/products"

export const http = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
})

export const getProducts = async () => {
    const response = await http.get<Product[]>(URL)
    return response.data
}

export const createProduct = async (name: string, price: number, inStock: boolean, category: string, imageUrl: string) => {
    const response = await http.post<Product>(URL)
    return response.data
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const response = await http.put(`${URL}/${id}`,
        data
    )

    return response.data
}

export const deleteProduct = async (id: string) => {
    await http.delete(`${URL}/${id}`)
}