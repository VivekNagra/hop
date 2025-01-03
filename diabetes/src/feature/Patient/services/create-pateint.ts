import { httpClient } from '@shangrila-cargo/lib/Axios';
import { PATIENTAPI } from '../api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse, SuccessResponse } from '@shangrila-cargo/lib/types';

export interface IPatientRequest {
  name: string;
  age: string;
  gender: string;
  glucose: string;
  blood_pressure: string;
  skin_thickness: string;
  insulin: string;
  bmi: string;
  risk_factor: string;
}

const createPatient = async (data: IPatientRequest) => {
  return httpClient.post(PATIENTAPI.CREATE, data);
};

export const useCreatePatient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PATIENTAPI.CREATE],
    mutationFn: createPatient,
    onSuccess: () => {
      toast({
        title: 'Patient created successfully',
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

export interface IPredictPatient {
  name: string;
  age: string;
  gender: string;
  glucose: string;
  blood_pressure: string;
  skin_thickness: string;
  insulin: string;
  bmi: string;
}

export interface IPredictPatientResponse {
  score: number;
  risk_factor: string;
  category: string;
}

const predictDiabetes = async (data: IPredictPatient) => {
  return httpClient.post<SuccessResponse<IPredictPatientResponse>>(
    PATIENTAPI.PREDICT,
    data,
  );
};

export const usePredictDiabetes = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PATIENTAPI.PREDICT],
    mutationFn: predictDiabetes,
    onSuccess: () => {
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
