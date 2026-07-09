import api from "./axios";
import type { Product, Category } from "../types/product";

export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get("/api/g/produk");

      // Cek struktur response
      if (response.data && typeof response.data === "object") {
        // Jika response memiliki property 'data' (misal: { data: [...] })
        if ("data" in response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        // Jika response langsung array
        if (Array.isArray(response.data)) {
          return response.data;
        }
      }
      return [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get(`/api/g/produk/${id}`);

      // PERBAIKAN: Cek response langsung, bukan response.data
      // Karena response dari API langsung berupa object produk
      if (response && typeof response === "object" && response.id) {
        return response;
      }

      // Cek jika response memiliki property data (untuk jaga-jaga)
      if (
        response.data &&
        typeof response.data === "object" &&
        response.data.id
      ) {
        return response.data;
      }

      // Jika response.data adalah array dengan 1 item
      if (
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data[0].id
      ) {
        return response.data[0];
      }

      // Jika tidak ditemukan
      console.error("Product not found. Response:", response);
      throw new Error(`Product with id ${id} not found`);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get("/api/g/kategori-produk");

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
      console.error("Error fetching product categories:", error);
      throw error;
    }
  },
};
