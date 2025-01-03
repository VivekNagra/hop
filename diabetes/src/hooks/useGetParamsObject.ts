import { useSearchParams } from 'react-router-dom';

export const useGetSearchParamsObject = () => {
  const [searchParams] = useSearchParams();
  const params: { [key: string]: string } = {};

  // Loop through each key-value pair
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};
