import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { AddSquare } from '@shangrila-cargo/assets/svgs';
import { useUpdateQueryParam } from '@shangrila-cargo/hooks';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounceCallback } from 'usehooks-ts';
import { TableHeaderProps } from './Table.types';

export const TableHeader = ({
  headerTitle,
  buttonTitle,
  onButtonClick,
}: TableHeaderProps) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') ?? '',
  );
  const debouncedSearchTerm = useDebounceCallback(setSearchTerm, 500);
  useUpdateQueryParam('search', searchTerm);

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} p={4}>
      <Box>
        <Text variant={'lg_semibold'}>{headerTitle}</Text>
      </Box>
      <Flex gap={4}>
        <Input
          placeholder="Search..."
          defaultValue={searchTerm}
          onChange={(e) => debouncedSearchTerm(e.target.value)}
        />
        <Button shadow={'lg'} leftIcon={<AddSquare />} onClick={onButtonClick}>
          {buttonTitle}
        </Button>
      </Flex>
    </Flex>
  );
};
