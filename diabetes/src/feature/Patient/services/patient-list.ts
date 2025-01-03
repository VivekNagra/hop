import { httpClient } from '@shangrila-cargo/lib/Axios';
import { useQuery } from '@tanstack/react-query';
import { SuccessResponse } from '@shangrila-cargo/lib/types';
import { PATIENTAPI } from '../api';
import { useQueryParams } from '@shangrila-cargo/hooks/useQueryParams';

export interface IPatientResponse {
  id: string;
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

const getPatientList = (params?: Record<string, string>) => {
  if (params?.search) {
    params.name = params.search;
    delete params.search;
  }

  return httpClient.get<SuccessResponse<IPatientResponse[]>>(
    PATIENTAPI.PATIENTLIST,
    {
      params,
    },
  );
};

export const useGetPatientList = () => {
  const params = useQueryParams();
  return useQuery({
    queryKey: [PATIENTAPI.PATIENTLIST, JSON.stringify(params)],
    queryFn: () => getPatientList(params),
    select: ({ data }) => data,
  });
};

const getPatientDetails = (id: string) => {
  return httpClient.get<SuccessResponse<IPatientResponse>>(
    PATIENTAPI.GETBYID.replace(':id', id),
  );
};

export const useGetPatientDetails = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [PATIENTAPI.GETBYID, id],
    queryFn: () => getPatientDetails(id),
    select: ({ data }) => data.data,
    enabled: !!id,
  });
};
