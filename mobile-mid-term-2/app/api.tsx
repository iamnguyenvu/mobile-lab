import axios from "axios";
import type { User } from "./types";

const BASE_URL = "https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1"

export const http = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
})

export const getUsers = async () : Promise<User[]> => {
    const response = await http.get<User[]>("/users"); return response.data;
}

export const createUser = async (name: string, email: string, role: "user"|"admin") : Promise<User> => {
    const response = await http.post<User>("/users", {name,email,role,active: true
    }); return response.data
}

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await http.put(`/users/${id}`, data); return response.data
}

export const deleteUser = async (id: string): Promise<void> => {
    await http.delete(`/users/${id}`)
}