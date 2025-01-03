import { httpClient } from '@shangrila-cargo/lib/Axios';
import { PATIENTAPI } from '../api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse } from '@shangrila-cargo/lib/types';

const deletePatient = async (id: string) => {
  return httpClient.delete(PATIENTAPI.DELETE.replace(':id', id));
};

export const useDeletePatient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PATIENTAPI.DELETE],
    mutationFn: deletePatient,
    onSuccess: () => {
      toast({
        title: 'Patient deleted successfully',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [PATIENTAPI.PATIENTLIST] });
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: error.response.data.message,
        status: 'error',
      });
    },
  });
};
