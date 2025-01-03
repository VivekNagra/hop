import { useForm } from 'react-hook-form';
import { LoginTypes } from '../types/Login';
import { useLoginMutation } from '../services/Login.service';

const defaultValues = {
  email: '',
  password: '',
};

export const useLoginForm = () => {
  const formMethods = useForm<LoginTypes>({
    defaultValues,
  });

  const { mutate, isPending } = useLoginMutation();

  const onLoginSubmit = (data: LoginTypes) => mutate(data);

  return {
    loginMethod: formMethods,
    onLoginSubmit,
    isLoading: isPending,
  };
};
