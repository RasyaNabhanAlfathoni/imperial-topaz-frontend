import api from "./axios";
import type { Service } from "../types/service";

export const serviceAPI = {
  getAll: async (): Promise<Service[]> => {
    try {
      const response = await api.get("/api/g/service");

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
      console.error("Error fetching services:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Service> => {
    try {
      const response = await api.get(`/api/g/service/${id}`);

      // PERBAIKAN: Cek response langsung, bukan response.data
      // Karena response dari API langsung berupa object service
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
      console.error("Service not found. Response:", response);
      throw new Error(`Service with id ${id} not found`);
    } catch (error) {
      console.error(`Error fetching service with id ${id}:`, error);
      throw error;
    }
  },
};
