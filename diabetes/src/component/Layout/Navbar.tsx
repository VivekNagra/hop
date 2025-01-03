import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useLogoutMutation } from '@shangrila-cargo/feature/Auth/services/Logout.service';
import { useGetUserDetails } from '@shangrila-cargo/feature/Auth/services/User.service';
import { useModalSearchParams } from '@shangrila-cargo/hooks/useModalSearchParams';
import { PredictDiabetes } from './PredictDiabetes';

export const Navbar = () => {
  const { data } = useGetUserDetails();
  const logout = useLogoutMutation();
  const { addModalOpen } = useModalSearchParams();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };
  return (
    <Box
      as={Flex}
      boxShadow="1px 1px 24px 0px #00000014"
      height="100%"
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.50"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Text>
        Predict Diabetes -{' '}
        <Text
          as={'span'}
          variant={'md_semibold'}
          color={'green.600'}
          cursor={'pointer'}
          onClick={() => addModalOpen('predict')}
        >
          {' '}
          here
        </Text>
      </Text>
      <PredictDiabetes />

      <HStack alignItems={'center'} gap={5}>
        <Flex flexDir={'column'}>
          <Text variant={'sm_semibold'}>{data?.email}</Text>
          <Text>{data?.role}</Text>
        </Flex>
        <Menu>
          <MenuButton>
            <Avatar name={data?.username} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};
