import { useQuery } from "@tanstack/react-query";
import { partnerAPI } from "../api/partner";

export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: partnerAPI.getAll,
  });
};
