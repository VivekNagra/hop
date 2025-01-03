import { TokenService } from '@shangrila-cargo/utils/TokenService';
import { useQuery } from '@tanstack/react-query';

const authentication = () => {
  return !!TokenService.getToken();
};

export const useIsAuthenticatedQuery = () => {
  return useQuery({
    queryKey: ['authentication'],
    queryFn: authentication,
  });
};
