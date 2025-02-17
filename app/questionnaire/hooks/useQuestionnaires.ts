import { useQuery } from "@tanstack/react-query";

import { getQuestionnaires } from "../lib/questionnaries";

const useQuestionnaires = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: () => getQuestionnaires(),
  });
  return { data: data?.data, isLoading, error };
};

export default useQuestionnaires;
