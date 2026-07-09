import api from "./axios";
import type { Project } from "../types/project";

export const projectAPI = {
  getAll: async (): Promise<Project[]> => {
    try {
      const response = await api.get("/api/g/proyek");

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
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Project> => {
    try {
      const response = await api.get(`/api/g/proyek/${id}`);

      // Karena response langsung object project
      if (response && typeof response === "object" && "id" in response) {
        return response as Project;
      }

      // Fallback: cek response.data
      if (
        response.data &&
        typeof response.data === "object" &&
        "id" in response.data
      ) {
        return response.data as Project;
      }

      throw new Error(`Project with id ${id} not found`);
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }
  },
};
