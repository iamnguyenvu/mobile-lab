import axios from "axios"
import type { Note } from "./types"

const BASE_URL = "https://68e8b99af2707e6128cbe614.mockapi.io/NguyenHoangNguyenVu_22003185"
const URL = "/notes"

export const http = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
})

export const getNotes = async () => {
    const response = await http.get<Note[]>(URL)
    return response.data
}

export const createNote = async (title: string, content: string) => {
    const response = await http.post<Note>(URL, { title, content, status: false })
    return response.data
}

export const updateNote = async (id: string, data: Partial<Note>) => {
    const response = await http.put(`${URL}/${id}`,
        data
    )
    return response.data
}

export const deleteNote = async (id: string) => {
    await http.delete(`${URL}/${id}`)
}