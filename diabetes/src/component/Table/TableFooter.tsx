import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US'; // Import English locale
import './pagination.css';
import { Box, Flex, Grid, Select, Text } from '@chakra-ui/react';
import { ArrowNext, ArrowPrevious } from '@shangrila-cargo/assets/svgs';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUpdateQueryParam } from '@shangrila-cargo/hooks';
import { TableFooterProps } from './Table.types';

const TableFooter = ({ totalCount }: TableFooterProps) => {
  const [searchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(searchParams.get('pageSize'));
  const [currentPage, setCurrentPage] = useState(searchParams.get('page'));
  useUpdateQueryParam('page', currentPage);
  useUpdateQueryParam('pageSize', pageSize);

  const updatePage = (page: number) => {
    setCurrentPage(page.toString());
  };

  return (
    <Flex justifyContent={'space-between'} p={4}>
      <Flex gap={3} alignItems={'center'}>
        <Text whiteSpace={'nowrap'} flex={1}>
          Show Result:
        </Text>
        <Select
          onChange={(e) => setPageSize(e.target.value)}
          size={'sm'}
          defaultValue={`${pageSize}`}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </Flex>
      <Box>
        <Pagination
          locale={en_US}
          prevIcon={
            <Grid placeItems="center" boxSize={{ base: 7, '2xl': 8 }}>
              <ArrowPrevious />
            </Grid>
          }
          nextIcon={
            <Grid placeItems="center" boxSize={{ base: 7, '2xl': 8 }}>
              <ArrowNext />
            </Grid>
          }
          align="end"
          pageSize={pageSize ? +pageSize : 10}
          current={currentPage ? +currentPage : 1}
          total={totalCount ?? 0}
          showSizeChanger
          onChange={updatePage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} results`
          }
        />
      </Box>
    </Flex>
  );
};

export default TableFooter;
