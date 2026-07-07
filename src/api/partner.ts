import api from "./axios";
import type { Partner } from "../types/partner";

export const partnerAPI = {
  getAll: async (): Promise<Partner[]> => {
    const response = await api.get("/api/g/mitra");
    return response.data;
  },

  getById: async (id: number): Promise<Partner> => {
    const response = await api.get(`/api/g/mitra/${id}`);
    return response.data;
  },
};
