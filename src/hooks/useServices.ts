import { useQuery } from "@tanstack/react-query";
import { serviceAPI } from "../api/service";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: serviceAPI.getAll,
  });
};

export const useService = (id: number) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => serviceAPI.getById(id),
    enabled: !!id,
  });
};
