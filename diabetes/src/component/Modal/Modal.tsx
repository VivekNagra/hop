import {
  Button,
  Modal as ChakraModal,
  HStack,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

import { CloseIcon } from '@shangrila-cargo/assets/svgs';

import { ModalProps } from './types';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  childBodyPaddingX,
  childBodyPaddingY,
  limitChildOverflow,
  isLoading,
  cancelButtonLabel = 'Cancel',
  submitButtonLabel = 'Submit',
  showSubmitButton = true,
  onSubmit,
  isDisabled = false,
  size = 'sm', // default size for modal
}: ModalProps) => {
  return (
    <ChakraModal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      size={size}
    >
      <ModalOverlay />
      <ModalContent
        boxShadow="0 4px 48px -2.5px #18274B24"
        borderRadius="16px"
        padding="6px"
      >
        <VStack
          alignItems="stretch"
          gap="0"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="16px"
          overflow="hidden"
        >
          <ModalHeader minHeight="56px" padding="0" backgroundColor="gray.50">
            <HStack
              justifyContent="space-between"
              borderBottom="1px solid"
              borderBottomColor="gray.100"
              height="56px"
              px="16px"
              sx={{
                svg: {
                  color: 'gray.400',
                },
              }}
            >
              <Text variant="md_semibold">{title}</Text>

              <CloseIcon onClick={onClose} cursor="pointer" />
            </HStack>
          </ModalHeader>
          <ModalBody
            margin="0"
            px={childBodyPaddingX}
            py={childBodyPaddingY}
            fontSize="15px"
            maxH={limitChildOverflow ? '100%' : undefined}
            overflowY={limitChildOverflow ? 'hidden' : undefined}
          >
            {children}
          </ModalBody>
          <ModalFooter padding="0">
            <HStack
              justifyContent="flex-end"
              gap="14px"
              borderTop="1px solid"
              borderTopColor="gray.100"
              width="full"
              height="70px"
              px="16px"
            >
              <Button onClick={onClose} variant="outline">
                {cancelButtonLabel}
              </Button>
              {showSubmitButton && (
                <Button
                  isLoading={isLoading}
                  onClick={onSubmit}
                  isDisabled={isDisabled}
                >
                  {submitButtonLabel}
                </Button>
              )}
            </HStack>
          </ModalFooter>
          ;
        </VStack>
      </ModalContent>
    </ChakraModal>
  );
};
