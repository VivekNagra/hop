import { httpClient } from '@shangrila-cargo/lib/Axios';
import { AUTH_API_ENDPOINT } from '../api';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TokenService } from '@shangrila-cargo/utils/TokenService';
import { PAGE_ROUTES } from '@shangrila-cargo/constant';
import { ErrorResponse } from '@shangrila-cargo/lib/types';

const logout = async () => {
  const token = TokenService.getToken('refresh_token');
  const data = {
    refresh: token,
  };
  return httpClient.post(AUTH_API_ENDPOINT.LOGOUT, data);
};

export const useLogoutMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [AUTH_API_ENDPOINT.LOGOUT],
    mutationFn: logout,
    onSuccess: () => {
      TokenService.logout();
      queryClient.setQueryData(['authentication'], () => false);
      navigate(PAGE_ROUTES.AUTH.LOGIN);
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: error.response.data.message,
        status: 'error',
      });
    },
  });
};
