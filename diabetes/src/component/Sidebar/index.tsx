import { Box, Divider, Flex } from '@chakra-ui/react';
import { NavItem } from './NavItem';
import { allRoutes } from '@shangrila-cargo/routes/Routes';
import { filterVisibleRoutes } from '@shangrila-cargo/utils';
import { SidebarProps } from './Sidebar.types';

const visibleRoutes = filterVisibleRoutes(allRoutes);

export const Sidebar = ({ isCollapsed, sidebarWidth }: SidebarProps) => {
  return (
    <Flex
      transition="all 0.4s ease"
      display="flex"
      flexDirection="column"
      p="18px"
      background="white"
      border="1px solid"
      borderColor="gray.50"
      borderRadius="16px"
      boxShadow="2px 2px 32px 0px #00000014"
      height="100%"
      gap={4}
      width={sidebarWidth}
    >
      <Box>
        <Divider mt={3} />
      </Box>
      <Box color="gray.700">
        {visibleRoutes.map((item) => (
          <NavItem key={item.name} isOpen={!isCollapsed} {...item} />
        ))}
      </Box>
    </Flex>
  );
};
