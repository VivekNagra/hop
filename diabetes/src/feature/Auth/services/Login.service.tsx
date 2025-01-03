import { httpClient } from '@shangrila-cargo/lib/Axios';
import { LoginResponseType, LoginTypes } from '../types/Login';
import { AUTH_API_ENDPOINT } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { ErrorResponse, SuccessResponse } from '@shangrila-cargo/lib/types';
import { TokenService } from '@shangrila-cargo/utils/TokenService';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@shangrila-cargo/constant';

const login = async (data: LoginTypes) => {
  return httpClient.post<SuccessResponse<LoginResponseType>>(
    AUTH_API_ENDPOINT.LOGIN,
    data,
  );
};

export const useLoginMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [AUTH_API_ENDPOINT.LOGIN],
    mutationFn: login,
    onSuccess: (response) => {
      const { data } = response;
      toast({
        title: 'User Logged in Successfully',
        status: 'success',
      });
      TokenService.setToken({
        key: 'access_token',
        value: data?.data?.accessToken,
      });
      TokenService.setToken({
        key: 'refresh_token',
        value: data?.data?.refreshToken,
      });
      queryClient.setQueryData(['authentication'], () => true);

      navigate(PAGE_ROUTES.DASHBOARD);
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: error.response.data.message,
        status: 'error',
      });
    },
  });
};
