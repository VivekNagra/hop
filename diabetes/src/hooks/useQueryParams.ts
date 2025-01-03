import { FILTER_KEY } from '@shangrila-cargo/constant';
import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const { search } = useLocation();
  const defaultParams = { page: '1', pageSize: '10' };

  if (!search) {
    return defaultParams;
  }

  const queryParams = new URLSearchParams(search);
  const queryObject: Record<string, string> = {};

  queryParams.forEach((value, key) => {
    if (Object.values(FILTER_KEY).includes(key)) {
      queryObject[key] = value;
    }
  });
  return { ...defaultParams, ...queryObject };
};
