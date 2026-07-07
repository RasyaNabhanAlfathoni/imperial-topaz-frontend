import api from "./axios";
import type { Service } from "../types/service";

export const serviceAPI = {
  getAll: async (): Promise<Service[]> => {
    const response = await api.get("/api/g/service");
    return response.data;
  },

  getById: async (id: number): Promise<Service> => {
    const response = await api.get(`/api/g/service/${id}`);
    return response.data;
  },
};
