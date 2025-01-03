import { httpClient } from '@shangrila-cargo/lib/Axios';
import { AUTH_API_ENDPOINT } from '../api';
import { useQuery } from '@tanstack/react-query';
import { SuccessResponse } from '@shangrila-cargo/lib/types';
import { UserDetailsTypes } from '../types/Login';

const getUserDetails = () => {
  return httpClient.get<SuccessResponse<UserDetailsTypes>>(
    AUTH_API_ENDPOINT.USER,
  );
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [AUTH_API_ENDPOINT.USER],
    queryFn: () => getUserDetails(),
    select: ({ data }) => data.data,
  });
};
