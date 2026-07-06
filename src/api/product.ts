import type { api } from "./axios";
import type { Product, Category } from "../types/product";

export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/api/v1/g/produk");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/api/v1/g/produk/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/api/v1/g/kategori-produk");
    return response.data;
  },
};
