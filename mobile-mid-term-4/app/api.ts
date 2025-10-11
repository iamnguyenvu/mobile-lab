import axios from "axios";

const API = "https://68e8b99af2707e6128cbe614.mockapi.io/NguyenHoangNguyenVu_22003185/notes";

export type Note = { id: string; title: string; content: string; status: boolean };

export const api = {
  get: async () => (await axios.get<Note[]>(API)).data,
  post: async (title: string) => (await axios.post<Note>(API, { title, content: "", status: false })).data,
  put: async (id: string, updates: Partial<Note>) => (await axios.put<Note>(`${API}/${id}`, updates)).data,
  del: async (id: string) => await axios.delete(`${API}/${id}`),
};