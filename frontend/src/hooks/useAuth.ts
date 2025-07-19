import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/packets";
import { apiRequest } from "@/lib/queryClient";

const AUTH_KEY = 'auth';

async function fetchUser() {
  const response = await apiRequest("GET", "/api/users/", {
    useToken: true
  });
  if (response.status === 200) {
    const userData = await response.json();
    return {
      ...userData,
      user_idx: -1
    }
  }
  else return null;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  
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

  const changeUserIdx = (userIdx: number) => {
    if (user) {
      queryClient.setQueryData([AUTH_KEY, 'user'], {
        ...user,
        user_idx: userIdx
      });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    changeUserIdx,
    logout,
    refresh
  };
}