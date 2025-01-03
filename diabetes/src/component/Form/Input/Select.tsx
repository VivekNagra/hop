import { Flex } from '@chakra-ui/react';
import { ArrowDown } from '@shangrila-cargo/assets/svgs';
import { THEME_COLORS } from '@shangrila-cargo/theme/colors';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { FormWrapper } from '../Wrapper';
import { SelectProps } from './Select.types';

export const SelectInput = ({
  name,
  label,
  selectOption,
  isRequired,
  isSearchable,
  isClearable,
  ...rest
}: SelectProps) => {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <FormWrapper
      error={error as FieldError}
      label={label}
      isRequired={isRequired}
    >
      <Flex width={'100%'}>
        <Select
          options={selectOption}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => {
              return <ArrowDown color={THEME_COLORS.primary[800]} />;
            },
          }}
          onBlur={onBlur}
          ref={ref}
          defaultValue={selectOption?.filter((item) => item.value == value)[0]}
          isSearchable={isSearchable}
          value={selectOption?.filter((item) => item.value === value)[0]}
          onChange={(value) => onChange(value?.value)}
          menuPosition="fixed"
          isClearable={!!isClearable}
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              width: '100%',
              fontSize: '14px',
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: 'gray.500',
              fontSize: '14px',
            }),

            control: (baseStyles) => ({
              ...baseStyles,
              paddingLeft: 4,
              paddingRight: 4,
              width: '100%',
              height: '40px',
              background: 'transparent',
              borderColor: error ? 'red' : THEME_COLORS.gray[400],
              boxShadow: 'none',
              borderRadius: '6px',
            }),
          }}
          {...rest}
        />
      </Flex>
    </FormWrapper>
  );
};
