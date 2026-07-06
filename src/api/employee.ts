import { api } from "./axios";
import { Employee, Position } from "../types/employee";

export const employeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get("/api/v1/g/karyawan");
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await api.get(`/api/v1/g/karyawan/${id}`);
    return response.data;
  },

  getPositions: async (): Promise<Position[]> => {
    const response = await api.get("/api/v1/g/jabatan");
    return response.data;
  },
};
