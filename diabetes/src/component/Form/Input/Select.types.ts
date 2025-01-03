export type SelectProps = {
  label?: string;
  selectOption: { label: string; value: string }[];
  isRequired?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
};

export type MultiSelectProps = {
  placeholder?: string;
  options: { label: string; value: string }[];
  label?: string;
  name: string;
  value?: string;
  error?: string;
  isRequired?: boolean;
  style?: Record<string, string>;
  required?: boolean;
  variant?: string;
  isMulti?: boolean;
};
