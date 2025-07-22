import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/packets";
import { apiRequest } from "@/lib/queryClient";
import { useUserIdx } from "@/global/interface";

const AUTH_KEY = 'auth';

async function fetchUser() {
  const response = await apiRequest("GET", "/api/users/", {
    useToken: true
  });
  if (response.status === 200) {
    return await response.json();
  }
  else return null;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { userIdx } = useUserIdx();
  
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: [AUTH_KEY, 'user'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  const logout = () => {
    localStorage.removeItem('jwtToken');
    queryClient.setQueryData([AUTH_KEY, 'user'], null);
  };

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [AUTH_KEY, 'user'] });
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    logout,
    refresh,
    selectedAssessor: user?.assessors.find(assessor => assessor.id === userIdx) || null
  };
}