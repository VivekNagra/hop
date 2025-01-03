import { ChakraProvider } from '@chakra-ui/react';
import { QueryProvider } from '@shangrila-cargo/provider/ReactQueryProvider';
import theme from '@shangrila-cargo/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const GlobalProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <BrowserRouter>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: 'bottom-right',
            isClosable: true,
            duration: 2000,
          },
        }}
      >
        <QueryClientProvider client={QueryProvider}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default GlobalProvider;
