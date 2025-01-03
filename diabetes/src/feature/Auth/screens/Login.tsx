import { Link } from 'react-router-dom';
import { Box, Button, Grid, HStack, Text, VStack } from '@chakra-ui/react';

import {
  FormProvider,
  PasswordInput,
  TextFieldInput,
} from '@shangrila-cargo/component/Form';
import { PAGE_ROUTES } from '@shangrila-cargo/constant';
import { useLoginForm } from '../hooks/useLoginForm';

export const Login = () => {
  const { loginMethod, onLoginSubmit, isLoading } = useLoginForm();
  return (
    <Grid
      placeItems="center"
      backgroundSize="cover"
      height="100%"
      minHeight="100vh"
      py="40px"
    >
      <FormProvider methods={loginMethod}>
        <form onSubmit={loginMethod.handleSubmit(onLoginSubmit)}>
          <VStack
            alignItems="stretch"
            gap="30px"
            padding="44px 34px"
            background="white"
            boxShadow="0px 4px 20px 0px #00000014"
            borderRadius="12px"
            width="443px"
          >
            <VStack gap="0">
              <Text variant="lg_semibold" marginTop="6px">
                Welcome
              </Text>

              <Text variant="sm_normal" color="gray.400">
                Login to your account with new password.
              </Text>
            </VStack>

            <VStack alignItems="stretch" gap="18px">
              <TextFieldInput
                name="email"
                label="Email Address"
                rightIcon="sms"
                isRequired
              />

              <Box>
                <PasswordInput name="password" label="Password" isRequired />
                <Text
                  as={Link}
                  to={PAGE_ROUTES.AUTH.FORGOT_PASSWORD}
                  variant="sm_semibold"
                  color="blue.500"
                  marginLeft="auto"
                  marginTop="12px"
                  width="fit-content"
                  display="block"
                >
                  Forgot Password?
                </Text>
              </Box>

              <HStack justifyContent="center" py="12px">
                <Button
                  width="149px"
                  height="48px"
                  type="submit"
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </form>
      </FormProvider>
    </Grid>
  );
};
