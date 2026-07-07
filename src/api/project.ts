import api from "./axios";
import type { Project } from "../types/project";

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get("/api/g/proyek");
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get(`/api/g/proyek/${id}`);
    return response.data;
  },
};
