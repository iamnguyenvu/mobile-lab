import axios from "axios";
import type { Todo } from "./types";

// Base URL từ MockAPI
const BASE_URL = "https://68e8b99af2707e6128cbe614.mockapi.io/NguyenHoangNguyenVu_22003185/todos";

// Tạo axios instance với config mặc định
export const http = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 5000, // 5 giây timeout
});

// GET - Lấy danh sách tất cả todos
export const getTodos = async (): Promise<Todo[]> => {
    const response = await http.get<Todo[]>("/");
    return response.data;
};

// POST - Tạo todo mới
export const createTodo = async (title: string): Promise<Todo> => {
    const response = await http.post<Todo>("/", {
        title,
        completed: false,
    });
    return response.data;
};

// PUT - Cập nhật todo (title hoặc completed)
export const updateTodo = async (id: string, data: Partial<Todo>): Promise<Todo> => {
    const response = await http.put<Todo>(`/${id}`, data);
    return response.data;
};

// DELETE - Xóa todo
export const deleteTodo = async (id: string): Promise<void> => {
    await http.delete(`/${id}`);
};