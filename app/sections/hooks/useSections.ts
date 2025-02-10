import { useQuery } from "@tanstack/react-query";
import getSections from "../lib/getSections";

const useSections = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections"],
    queryFn: () => getSections(),
  });

  return { data, isLoading, error };
};

export default useSections;
