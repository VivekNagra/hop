import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { IncrementDecrementEnum } from '@shangrila-cargo/enums/increamentDecrement';

export const Cards = ({
  icon,

  title,
  value,
}: CardPropsTypes) => {
  return (
    <HStack
      rounded={'lg'}
      border={'1px solid'}
      borderColor={'gray.100'}
      px={'18px'}
      py={3}
      columnGap={5}
    >
      {icon && <Box>{icon}</Box>}
      <VStack alignItems={'start'}>
        <Text variant={'xs_normal'} color={'gray.500'}>
          {title}
        </Text>
        <HStack>
          <Text variant={'lg_semibold'}>{value}</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

type CardPropsTypes = {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  changePercentage?: string;
  changeVariation?: IncrementDecrementEnum;
  periodic?: string;
};
