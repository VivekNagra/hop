import { ChangeEvent } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { Icon } from '@shangrila-cargo/component/Icon';
import { ThemeVariantEnum } from '@shangrila-cargo/enums';

import { FormWrapper } from '../Wrapper';

import type { TextFieldInputProps } from './Input.types';

export const TextFieldInput = ({
  variant = ThemeVariantEnum.DEFAULT_INPUT_VARIANT,
  name,
  handleChange,
  isDisabled,
  isRequired,
  label,
  placeholder,
  triggers,
  rightIcon,
  type = 'text',
}: TextFieldInputProps) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

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
          variant={variant}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={isDisabled ? undefined : handleInputChange}
          isDisabled={isDisabled}
          onBlur={onBlur}
          type={type}
          paddingRight={rightIcon ? '36px' : undefined}
        />

        {rightIcon && (
          <InputRightElement>
            <Icon name={rightIcon} />
          </InputRightElement>
        )}
      </InputGroup>
    </FormWrapper>
  );
};
