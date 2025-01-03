import {
  Box,
  Flex,
  Grid,
  IconButton,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { CollapseLeft } from '@shangrila-cargo/assets/svgs';

export const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnchored, setIsAnchored] = useState(true);

  const onMouseEnter = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const onMouseLeave = () => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  };

  const sidebarWidth = useBreakpointValue({
    base: isCollapsed ? '50px' : '100px', // Small screens (e.g., mobile)
    md: isCollapsed ? '60px' : '200px', // Medium screens
    lg: isCollapsed ? '80px' : '235px', // Large screens (e.g., desktop)
    '2xl': isCollapsed ? '80px' : '265px', // Extra large screens
  });

  const toggleSidebar = () => {
    if (!isAnchored) {
      setIsCollapsed(false);
      setIsAnchored(true);
    } else {
      setIsAnchored(false);
      setIsCollapsed(true);
    }
  };

  return (
    <Grid
      transition={'all 0.4s ease'}
      gridTemplateColumns={`${sidebarWidth} 1fr`}
      h="100dvh"
      width={'100%'}
      pt={5}
      pl={5}
    >
      <Flex
        boxSize="100%"
        position="relative"
        alignItems={isCollapsed ? 'center' : 'flex-start'}
        transition={'all 0.4s ease'}
        onMouseEnter={!isAnchored ? onMouseEnter : undefined}
        onMouseLeave={!isAnchored ? onMouseLeave : undefined}
        pb={5}
      >
        <Sidebar sidebarWidth={sidebarWidth} isCollapsed={isCollapsed} />

        <IconButton
          aria-label="Toggle Sidebar"
          icon={
            !isAnchored ? (
              <CollapseLeft
                style={{
                  transform: 'rotate(180deg)',
                }}
              />
            ) : (
              <CollapseLeft width={'23px'} height={'23px'} />
            )
          }
          onClick={toggleSidebar}
          bg={'whitesmoke'}
          color={'black'}
          shadow={'lg'}
          border={'1px solid gray'}
          borderColor={'gray.100'}
          position="absolute"
          size={'sm'}
          top={isCollapsed ? '10px' : '20px'}
          right={isCollapsed ? '-20px' : '-11px'}
          alignSelf={isCollapsed ? 'center' : 'flex-end'}
          _hover={{
            backgroundColor: 'gray.100',
          }}
        />
      </Flex>

      <VStack alignItems="stretch" gap="0" height="100%">
        <Box
          height={{
            base: '58px',
            '2xl': '68px',
          }}
          px="24px"
        >
          <Navbar />
        </Box>

        <Box flex={1} overflow="hidden">
          <Box padding="24px" height="full">
            <Outlet />
          </Box>
        </Box>
      </VStack>
    </Grid>
  );
};
