import { VStack } from '@chakra-ui/react';

import { TableHeader } from '@shangrila-cargo/component/Table';

export const Inquiry = () => {
  return (
    <VStack
      alignItems="stretch"
      border="1px solid"
      borderColor="gray.50"
      borderRadius="8px"
      boxShadow="1px 1px 24px 0px #00000014"
      height="full"
    >
      <TableHeader headerTitle="Inquiry" buttonTitle="Assign" />
    </VStack>
  );
};

export default Inquiry;
