import {
  Box,
  Table as ChakraTable,
  Flex,
  Spinner,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { EmptyStateIllustration } from '@shangrila-cargo/assets/svgs';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableProps } from './Table.types';
import TableFooter from './TableFooter';
import { TableHeader } from './TableHeader';

export const DataTable = <T,>({
  data,
  columns,
  headerProps,
  isPending,
  totalCount,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box bg={'white'} p={1} borderRadius={'lg'} shadow={'xl'}>
      <TableHeader {...headerProps} />
      <TableContainer justifyContent={'center'}>
        <ChakraTable variant="simple">
          <Thead backgroundColor={'gray.50'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    <Box color={'gray.800'}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {isPending && (
              <Tr mt={4}>
                <Td
                  width={'100%'}
                  colSpan={100}
                  textAlign={'center'}
                  borderBottom={'none'}
                >
                  <Spinner />
                </Td>
              </Tr>
            )}
            {!data?.length && !isPending && (
              <Tr height="100%">
                <Td
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  textAlign="center"
                  borderBottom={0}
                  height="100%"
                >
                  <Flex justifyContent={'center'}>
                    <EmptyStateIllustration width={'200px'} height={'200px'} />
                  </Flex>
                  <Text>No Items Found.</Text>
                </Td>
              </Tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    <Box color="gray.500">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Box>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </ChakraTable>
      </TableContainer>
      {!!totalCount && <TableFooter totalCount={totalCount} />}
    </Box>
  );
};
