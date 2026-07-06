import { api } from "./axios";
import { News, NewsCategory } from "../types/news";

export const newsAPI = {
  getAll: async (): Promise<News[]> => {
    const response = await api.get("/api/v1/g/berita");
    return response.data;
  },

  getById: async (id: number): Promise<News> => {
    const response = await api.get(`/api/v1/g/berita/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<News> => {
    const response = await api.get(`/api/v1/g/berita/slug/${slug}`);
    return response.data;
  },

  getCategories: async (): Promise<NewsCategory[]> => {
    const response = await api.get("/api/v1/g/kategori-berita");
    return response.data;
  },
};
