import { ResponsiveValue } from '@chakra-ui/react';

import { IconNamesType } from '@shangrila-cargo/component/Icon';

export type InputVariant = ResponsiveValue<'primary'>;

export type TextFieldInputProps = {
  variant?: InputVariant;

  name: string;
  label?: string;
  type?: string;
  placeholder?: string;

  handleChange?: (value: string) => void;
  isRequired?: boolean;
  isDisabled?: boolean;

  triggers?: string[];

  rightIcon?: IconNamesType;
};

export type PasswordInputProps = TextFieldInputProps;
