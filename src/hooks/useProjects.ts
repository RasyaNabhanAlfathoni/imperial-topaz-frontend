import { useQuery } from "@tanstack/react-query";
import { projectAPI } from "../api/project";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectAPI.getAll,
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectAPI.getById(id),
    enabled: !!id,
  });
};
