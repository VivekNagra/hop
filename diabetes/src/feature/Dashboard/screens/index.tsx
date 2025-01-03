import { Box, Grid, Stack, VStack } from '@chakra-ui/react';
import {
  AnalyticsReportEnum,
  IncrementDecrementEnum,
} from '@shangrila-cargo/enums';
import { Cards, SwitchIcon } from '../components';
import BarChart from '../components/BarChart';
import RiskPieChart from '../components/PieChart';
import { useGetStat } from '../hooks/statistics';

export const Dashboard = () => {
  const stat = useGetStat();

  return (
    <VStack w={'full'} rowGap={6}>
      <Box
        margin={'auto'}
        w={'full'}
        height="full"
        alignItems="stretch"
        border="1px solid"
        borderColor="gray.50"
        borderRadius="8px"
        boxShadow="1px 1px 24px 0px #00000014"
        p={6}
      >
        <Grid templateColumns={'repeat(auto-fit, minmax(300px,1fr))'} gap={6}>
          <Cards
            changePercentage={'10'}
            changeVariation={IncrementDecrementEnum.DECREMENT}
            icon={<SwitchIcon caseValue={AnalyticsReportEnum.CUSTOMER} />}
            periodic={'0.00'}
            title={'Total Patient'}
            value={stat?.data?.total_patients ?? 0}
          />
          <Cards
            changePercentage={'10'}
            changeVariation={IncrementDecrementEnum.DECREMENT}
            icon={<SwitchIcon caseValue={AnalyticsReportEnum.CUSTOMER} />}
            periodic={'0.00'}
            title={'Average BMI'}
            value={stat?.data?.averages?.avg_bmi?.toFixed(2) ?? 0}
          />
          <Cards
            changePercentage={'10'}
            changeVariation={IncrementDecrementEnum.DECREMENT}
            icon={<SwitchIcon caseValue={AnalyticsReportEnum.CUSTOMER} />}
            periodic={'0.00'}
            title={'Average Glucose'}
            value={stat?.data?.averages?.avg_glucose?.toFixed(2) ?? 0}
          />
          <Cards
            changePercentage={'10'}
            changeVariation={IncrementDecrementEnum.DECREMENT}
            icon={<SwitchIcon caseValue={AnalyticsReportEnum.CUSTOMER} />}
            periodic={'0.00'}
            title={'Average Insulin'}
            value={stat?.data?.averages?.avg_insulin?.toFixed(2) ?? 0}
          />
        </Grid>
      </Box>

      <Box
        margin={'auto'}
        w={'full'}
        height="full"
        flex={1}
        border="1px solid"
        borderColor="gray.50"
        borderRadius="8px"
        boxShadow="1px 1px 24px 0px #00000014"
        alignItems="stretch"
        p={6}
      >
        <Stack
          w={'full'}
          flexDir={{ base: 'column', lg: 'row' }}
          justifyContent={{ base: 'center', lg: 'flex-start' }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
          gap={6}
        >
          <Box w={{ base: 'full', lg: '60%' }}>
            <BarChart data={stat?.data?.age_groups ?? []} />
          </Box>
          <Box w={{ base: 'full', lg: '40%' }}>
            <RiskPieChart data={stat?.data?.risk_data ?? []} />
          </Box>
        </Stack>
      </Box>
    </VStack>
  );
};
