import { api } from "./axios";
import { Project } from "../types/project";

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get("/api/v1/g/proyek");
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get(`/api/v1/g/proyek/${id}`);
    return response.data;
  },
};
