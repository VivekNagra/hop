import { HStack, Text, VStack } from '@chakra-ui/react';
import { LegendProps } from 'recharts';

export const ChartTooltip = (props: LegendProps) => {
  const { payload } = props ?? {};
  return (
    <VStack
      borderRadius={35}
      bg={'gray.700'}
      px={7}
      py={2}
      alignItems={'flex-start'}
      rowGap={2}
    >
      {payload?.map((entry, index) => (
        <HStack key={index}>
          <Text variant="sm_normal" color={'white'}>
            {`${entry.dataKey?.toString()}: `}
          </Text>
          <Text variant="sm_normal" color={'white'}>
            {entry.value}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};
