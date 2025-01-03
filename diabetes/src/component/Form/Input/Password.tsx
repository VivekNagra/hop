import { ChangeEvent } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';

import { Icon } from '@shangrila-cargo/component/Icon';
import { ThemeVariantEnum } from '@shangrila-cargo/enums';

import { FormWrapper } from '../Wrapper';

import type { PasswordInputProps } from './Input.types';

export const PasswordInput = ({
  variant = ThemeVariantEnum.DEFAULT_INPUT_VARIANT,
  name,
  handleChange,
  isDisabled,
  isRequired,
  label,
  placeholder,
  triggers,
}: PasswordInputProps) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const { isOpen, onToggle } = useDisclosure();

  const {
    field: { onChange, onBlur, ref, value },
  } = useController({
    control,
    name,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (handleChange) {
      handleChange(value);

      trigger(name);
    } else onChange(event);

    triggers?.map((name) => trigger(name)); // trigger other fields if connected to this field
  };

  return (
    <FormWrapper
      label={label}
      error={errors?.[name] as FieldError}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      <InputGroup>
        <ChakraInput
          type={isOpen ? 'text' : 'password'}
          variant={variant}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={isDisabled ? undefined : handleInputChange}
          isDisabled={isDisabled}
          onBlur={onBlur}
          paddingRight="36px"
        />

        <InputRightElement>
          <Icon
            name={isOpen ? 'eye_open' : 'eye_close'}
            onClick={onToggle}
            cursor="pointer"
          />
        </InputRightElement>
      </InputGroup>
    </FormWrapper>
  );
};

export default PasswordInput;
