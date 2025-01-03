import {
  matchPath,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Route } from '@shangrila-cargo/routes/AppRoutes.type';
import { RecordCircleBoldIcon } from '@shangrila-cargo/assets/svgs';

import { ChildNavItemProps } from './Sidebar.types';

const useTabsListMatches = (tabsList: { route: string }[]) => {
  const { pathname } = useLocation();
  return tabsList.find(({ route }) => matchPath(route, pathname));
};

const ChildNavItem = ({ item }: { item: Route }) => {
  const match = useMatch({ path: item.route, end: true });
  const navigate = useNavigate();

  return (
    <HStack
      key={item.route}
      onClick={() => navigate(item.route)}
      width={'100%'}
      p="8px 16px"
      textDecoration={'none'}
      _focus={{ boxShadow: 'none' }}
      whiteSpace={'nowrap'}
      transition="transform 0.3s ease"
      _hover={{
        transform: match ? undefined : 'translate(10px)',
      }}
      sx={
        match
          ? {
              backgroundColor: 'primary.100',
              color: 'primary.900',
            }
          : {}
      }
      borderRadius="xl"
      cursor="pointer"
    >
      <Box
        sx={{
          svg: {
            color: match ? 'primary.900' : 'gray.700',
          },
        }}
      >
        <RecordCircleBoldIcon width="12" />
      </Box>

      <Text variant="sm_semibold">{item.name}</Text>
    </HStack>
  );
};

const NavItemWithChild = ({ child, isOpen, parent }: ChildNavItemProps) => {
  const match = useTabsListMatches(
    child.map((e) => {
      return { route: e.route };
    }),
  );

  return (
    <Accordion defaultIndex={match && [0]} allowToggle mt={1}>
      <AccordionItem border={'none'} justifyContent={'space-between'}>
        <AccordionButton
          sx={
            match
              ? {
                  backgroundColor: 'primary.900',
                  color: 'primary.50',
                }
              : {}
          }
          py="12px"
          px={isOpen ? '16px' : '12px'}
          width="full"
          borderRadius={'xl'}
          _hover={{}}
        >
          <Icon
            mr="2"
            fontSize="20"
            _groupHover={{
              color: 'white',
            }}
          >
            {parent.icon}
          </Icon>
          {isOpen && (
            <Text as="span" variant="sm_semibold" flex="1" textAlign="left">
              {parent.name}
            </Text>
          )}

          {isOpen && <AccordionIcon />}
        </AccordionButton>
        {isOpen && (
          <AccordionPanel padding="12px 14px 0">
            <VStack>
              {child?.map((item) => {
                return <ChildNavItem key={item.route} item={item} />;
              })}
            </VStack>
          </AccordionPanel>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default NavItemWithChild;
