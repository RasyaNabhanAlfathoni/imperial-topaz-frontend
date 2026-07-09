import api from "./axios";
import type { News, NewsCategory } from "../types/news";

export const newsAPI = {
  getAll: async (): Promise<News[]> => {
    try {
      const response = await api.get("/api/g/berita");

      // Cek struktur response
      if (response.data && typeof response.data === "object") {
        if ("data" in response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        if (Array.isArray(response.data)) {
          return response.data;
        }
      }
      return [];
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<News> => {
    try {
      const response = await api.get(`/api/g/berita/${id}`);

      if (response && typeof response === "object" && "id" in response) {
        return response as News;
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        "id" in response.data
      ) {
        return response.data as News;
      }

      throw new Error(`News with id ${id} not found`);
    } catch (error) {
      console.error(`Error fetching news with id ${id}:`, error);
      throw error;
    }
  },

  getBySlug: async (slug: string): Promise<News> => {
    try {
      const response = await api.get(`/api/g/berita/slug/${slug}`);

      if (response && typeof response === "object" && "id" in response) {
        return response as News;
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        "id" in response.data
      ) {
        return response.data as News;
      }

      throw new Error(`News with slug ${slug} not found`);
    } catch (error) {
      console.error(`Error fetching news with slug ${slug}:`, error);
      throw error;
    }
  },

  getCategories: async (): Promise<NewsCategory[]> => {
    try {
      const response = await api.get("/api/g/kategori-berita");

      if (response.data && typeof response.data === "object") {
        if ("data" in response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        if (Array.isArray(response.data)) {
          return response.data;
        }
      }
      return [];
    } catch (error) {
      console.error("Error fetching news categories:", error);
      throw error;
    }
  },
};
