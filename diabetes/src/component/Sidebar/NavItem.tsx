import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { NavLink as Link, useMatch } from 'react-router-dom';
import NavItemWithChild from './NavItemWithChild';
import { NavItemProps } from './Sidebar.types';

export const NavItem = ({
  icon,
  name,
  route,
  children,
  isOpen,
}: NavItemProps) => {
  const match = useMatch({ path: route, end: true });

  return (
    <Box>
      {children?.length ? (
        <NavItemWithChild
          parent={{
            name,
            icon,
          }}
          child={children}
          isOpen={isOpen}
        />
      ) : (
        <Flex
          as={Link}
          mt={1}
          to={route}
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}
          _activeLink={{
            backgroundColor: 'primary.900',
            color: 'primary.50',
            svg: {
              color: 'white',
            },
          }}
          alignItems="center"
          gap="12px"
          justifyContent={'center'}
          py="12px"
          px={isOpen ? '16px' : '12px'}
          borderRadius="xl"
          cursor="pointer"
          transition="transform 0.3s ease"
          _hover={{
            transform: match ? undefined : 'translate(10px)',
          }}
          width={'100%'}
        >
          <Icon
            fontSize="20"
            color="primary.900"
            _groupHover={{
              color: 'white',
            }}
          >
            {icon}
          </Icon>

          {isOpen && (
            <Text variant="sm_semibold" width={'100%'} whiteSpace={'nowrap'}>
              {name}
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
};
