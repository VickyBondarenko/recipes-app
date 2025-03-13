import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../api/mealApi";

export const useMeals = () => {
  return useQuery({
    queryKey: ["meals"],
    queryFn: () => getMeals(),
    staleTime: 1000 * 60 * 30,
  });
};
