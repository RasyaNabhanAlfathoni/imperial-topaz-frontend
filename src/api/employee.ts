import api from "./axios";
import type { Employee, Position } from "../types/employee";

export const employeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get("/api/g/karyawan");
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await api.get(`/api/g/karyawan/${id}`);
    return response.data;
  },

  getPositions: async (): Promise<Position[]> => {
    const response = await api.get("/api/g/jabatan");
    return response.data;
  },
};
