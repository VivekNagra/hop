import { httpClient } from '@shangrila-cargo/lib/Axios';
import { PATIENTAPI } from '../api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse } from '@shangrila-cargo/lib/types';
import { IPatientRequest } from './create-pateint';

const updatePatient = async ({
  id,
  data,
}: {
  id: string;
  data: IPatientRequest;
}) => {
  return httpClient.patch(PATIENTAPI.UPDATE.replace(':id', id), data);
};

export const useUpdatePatient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      toast({
        title: 'Patient updated successfully',
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
