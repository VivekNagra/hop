import { DashboardAPI } from '@shangrila-cargo/feature/Api';
import { httpClient } from '@shangrila-cargo/lib/Axios';
import { useQuery } from '@tanstack/react-query';

interface PatientStatistics {
  total_patients: number;
  averages: {
    avg_bmi: number;
    avg_insulin: number;
    avg_glucose: number;
  };
  age_groups: Array<{
    name: string;
    High: number;
    Medium: number;
    Low: number;
  }>;
  risk_data: Array<{
    name: string;
    value: number;
  }>;
}

const getStat = () => {
  return httpClient.get<PatientStatistics>(DashboardAPI.STAT);
};

export const useGetStat = () => {
  return useQuery({
    queryKey: [DashboardAPI.STAT],
    queryFn: getStat,
    select: ({ data }) => data,
  });
};
