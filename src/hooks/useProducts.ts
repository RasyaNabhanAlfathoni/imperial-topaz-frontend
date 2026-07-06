import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../api/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productAPI.getAll,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productAPI.getById(id),
    enabled: !!id,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: productAPI.getCategories,
  });
};
