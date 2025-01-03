import React, { MutableRefObject } from 'react';
import { FieldError, FieldValues, UseFormReturn } from 'react-hook-form';
import { TestContext } from 'yup';

export type FormWrapperProps = {
  children: React.ReactNode;

  label?: string;
  error?: FieldError;

  isRequired?: boolean;
  isDisabled?: boolean;

  focusRef?: MutableRefObject<HTMLInputElement | null>;
};

export type FormProviderProps<TFieldValues extends FieldValues> = {
  methods: UseFormReturn<TFieldValues, TestContext, undefined>;
  children: React.ReactNode;
};
