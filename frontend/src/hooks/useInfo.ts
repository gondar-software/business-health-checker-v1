import { useQuery } from "@tanstack/react-query";
import { Info } from "@/types/packets";
import { apiRequest } from "@/lib/queryClient";

const AUTH_KEY = 'info';

async function fetchInfo() {
  const response = await apiRequest("GET", "/api/infos/", {
    useToken: true
  });
  if (response.status === 200) {
    return await response.json();
  }
  else return null;
}

async function createOrUpdateInfo(info: any) {
  const response = await apiRequest("PUT", "/api/infos/", {
    data: info,
    useToken: true
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error(`Error: ${response.status}`);
  }
}

export const useInfo = () => {
  const { data: info, isLoading, error } = useQuery<Info>({
    queryKey: [AUTH_KEY, 'info'],
    queryFn: fetchInfo,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  return {
    info,
    isLoading,
    error,
    createOrUpdateInfo,
  };
}