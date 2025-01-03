import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';

import { FormWrapperProps } from './Wrapper.types';

export const FormWrapper = ({
  label,
  error,
  children,
  isRequired,
  isDisabled,
  focusRef,
}: FormWrapperProps) => {
  const errorMessage = error?.message;

  return (
    <FormControl isInvalid={!!errorMessage} isDisabled={isDisabled}>
      {label && (
        <FormLabel
          marginBottom="2"
          width="fit-content"
          onClick={() => focusRef?.current?.focus()}
        >
          <Text variant="sm_normal">
            {label}

            {isRequired ? (
              <Text as="span" color="red.300">
                {' '}
                *
              </Text>
            ) : undefined}
          </Text>
        </FormLabel>
      )}

      {children}

      {errorMessage && (
        <FormErrorMessage marginTop="1">{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
