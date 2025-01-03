import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUpdateQueryParam = (param: string, value: string | null) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Function to update or remove the query parameter

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set(param, value); // Add or update the query parameter
    } else {
      newSearchParams.delete(param); // Remove the query parameter if the value is null
    }
    setSearchParams(newSearchParams);
  }, [param, value, searchParams, setSearchParams]);
};
