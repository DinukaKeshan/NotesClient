import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getNotes = () => axios.get(`${BASE_URL}/notes`);
export const createNote = (data) => axios.post(`${BASE_URL}/notes`, data);
export const updateNote = (id, data) => axios.put(`${BASE_URL}/notes/${id}`, data);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/notes/${id}`);

