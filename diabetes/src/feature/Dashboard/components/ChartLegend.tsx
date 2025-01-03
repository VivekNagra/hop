import { Box, Flex, Text } from '@chakra-ui/react';
import { LegendProps } from 'recharts';
import { getColorForGradient } from '../utils';

export const ChartLegend = (
  props: LegendProps & { customColors?: Array<{ [key: string]: string }> },
) => {
  const { payload, customColors } = props ?? {};

  return (
    <Flex justifyContent="flex-start" ms={-1} flexWrap="wrap">
      {payload?.map((entry, index) => (
        <Flex key={index} alignItems="center" mr={5}>
          <Box
            mr={2}
            w={4}
            h={4}
            bg={
              entry?.color
                ? getColorForGradient(entry.color, customColors)
                : 'inherit'
            }
            rounded="sm"
          />
          <Text variant="sm_normal">{entry.value}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
