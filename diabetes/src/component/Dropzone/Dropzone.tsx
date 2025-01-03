import {
  Box,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';
import { DropzoneProps } from './Dropzone.types';

export const Dropzone = ({
  accept = {},
  handleChange,
  handleRemove,
  height,
  icon,
  isRequired,
  isMulti = false,
  maxNoOfFiles,
  label,
  maxFileSize = 100097152,
  minFileSize = 51200,
  name,
  placeholderComponent,
  text,
  width,
  borderRadius,
}: DropzoneProps) => {
  const dropzoneRef = useRef<HTMLDivElement | null>(null);

  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const { setError, clearErrors } = useFormContext() || {};

  const { value } = field;

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = isMulti ? acceptedFiles : acceptedFiles[0];
      clearErrors(name);

      // Custom error for single upload
      if (
        (!isMulti && file instanceof File && file?.size < minFileSize) ||
        (file as File)?.size > maxFileSize
      ) {
        setError(name, {
          type: 'manual',
          message:
            (file as File).size < minFileSize
              ? `Upload Item cannot be less than ${(minFileSize / 1024).toFixed(2)} KB`
              : (file as File).size > maxFileSize
                ? `Upload Item cannot be more than ${(maxFileSize / (1024 * 1024)).toFixed(2)} MB`
                : 'Error while uploading',
        });
        return;
      }
      handleChange?.(file);
      field.onChange(file);
    },
    [
      clearErrors,
      field,
      handleChange,
      maxFileSize,
      minFileSize,
      name,
      setError,
    ],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDropAccepted,
    maxFiles: maxNoOfFiles || 1,
    multiple: !!isMulti,
  });

  const handleFileRemove = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    handleRemove?.();
    field.onChange(null);
  };

  const errorMessage = error?.message;

  return (
    <FormControl
      gap={2}
      isInvalid={!!error}
      sx={{
        'label, .chakra-form__error-message, .dropzone-default-preview-text': {
          opacity: 0.8,
        },
        _hover: {
          'label, .chakra-form__error-message, .dropzone-default-preview-text':
            {
              opacity: 1,
            },
        },
      }}
    >
      {label && (
        <FormLabel onClick={() => dropzoneRef?.current?.click()}>
          {label}
          {isRequired && (
            <Text as={'span'} color={'red.500'}>
              {' '}
              *
            </Text>
          )}
        </FormLabel>
      )}

      <Box
        {...getRootProps({
          onClick: !value ? undefined : (event) => event.stopPropagation(),
        })}
        background={field?.value ? 'white' : 'grey.50'}
        border={'1px dashed !important'}
        borderColor={
          (field?.value as File)?.size > minFileSize &&
          (field?.value as File)?.size < maxFileSize
            ? 'secondary.400 !important'
            : error
              ? 'red.400 !important'
              : 'grey.400'
        }
        borderRadius={'8px'}
        cursor="pointer"
        display={'grid'}
        height={height ?? 124}
        placeItems={'center'}
        position="relative"
        ref={dropzoneRef}
        transition={'0.3s all ease-in-out'}
        width={width ?? 148}
        _hover={{
          bg: 'secondary.50',
          borderColor: 'secondary.400 !important',
          '&>div>p': {
            color: 'grey.400',
          },
        }}
      >
        {!value && (
          <>
            {placeholderComponent ? (
              <> {placeholderComponent}</>
            ) : (
              <Box
                display="flex"
                gap={2}
                flexDirection="column"
                alignItems="center"
              >
                {icon}
                <Text color="grey.900" px={3} textAlign="center">
                  {text ?? 'Upload'}
                </Text>
              </Box>
            )}
          </>
        )}
        <input {...getInputProps()} />
        {value && (
          <>
            <CloseButton
              size="sm"
              position="absolute"
              top={0.5}
              right={0.5}
              borderRadius="full"
              width={18}
              height={18}
              bg={'red.200'}
              color="red.600"
              onClick={handleFileRemove}
            />

            {isMulti ? (
              <Tooltip
                m={0}
                hasArrow
                bg={'secondary.300'}
                rounded={'md'}
                p={2}
                label={
                  <>
                    {(value as Array<File | string>)
                      ?.map?.((itm) => (itm instanceof File ? itm?.name : itm))
                      ?.join(', ')}
                  </>
                }
              >
                <Text
                  rounded={'sm'}
                  bg={'secondary.200'}
                  px={1}
                  color={'white'}
                  noOfLines={1}
                  maxW={'full'}
                  overflowX={'auto'}
                >
                  {`${(value as Array<File | string>)?.length} items selected`}
                </Text>
              </Tooltip>
            ) : (
              <>
                {value ? (
                  <Image
                    src={
                      typeof value === 'string'
                        ? value
                        : URL.createObjectURL(value)
                    }
                    width={width || 155}
                    height={height || '54px'}
                    alt="user profile image"
                    style={{
                      objectFit: 'cover',
                    }}
                    borderRadius={borderRadius || 4}
                  />
                ) : (
                  <Text
                    rounded={'sm'}
                    bg={'secondary.200'}
                    px={1}
                    color={'white'}
                    noOfLines={1}
                    maxW={'full'}
                    overflowX={'auto'}
                  >
                    {value?.name}
                  </Text>
                )}
              </>
            )}
          </>
        )}
      </Box>

      <FormErrorMessage marginTop={1} color={'red.600'}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
};
