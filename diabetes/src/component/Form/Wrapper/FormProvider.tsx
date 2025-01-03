import {
  FieldValues,
  FormProvider as ReactHookFormProvider,
} from 'react-hook-form';

import { FormProviderProps } from './Wrapper.types';

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
}: FormProviderProps<TFieldValues>) => {
  return <ReactHookFormProvider {...methods}>{children}</ReactHookFormProvider>;
};
