import { useQuery } from "@tanstack/react-query";
import { newsAPI } from "../api/news";

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: newsAPI.getAll,
  });
};

export const useNewsCategories = () => {
  return useQuery({
    queryKey: ["newsCategories"],
    queryFn: newsAPI.getCategories,
  });
};
