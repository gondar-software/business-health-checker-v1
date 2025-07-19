import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Assessor } from "@/types/packets";
import { apiRequest } from "@/lib/queryClient";

const AUTH_KEY = 'assessors';

async function fetchAssessors() {
  const response = await apiRequest("GET", "/api/assessors/", {
    useToken: true
  });
  if (response.status === 200) {
    const assessorsData = await response.json();
    return {
      ...assessorsData,
    }
  }
  else return [];
}

export const useAssessors = () => {
  const queryClient = useQueryClient();

  const { data: assessors = {}, isLoading, error } = useQuery<Assessor[]>({
    queryKey: [AUTH_KEY, 'assessors'],
    queryFn: fetchAssessors,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [AUTH_KEY, 'assessors'] });
  }

  return {
    assessors: Object.values<Assessor>(assessors),
    isLoading,
    error,
    refresh
  };
}