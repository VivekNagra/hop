import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { patientDefaultValue } from '../const';
import { IPatientData, PatientEditType } from '../types';
import { patientSchema } from '../schema';
import { useCreatePatient } from '../services/create-pateint';
import { useUpdatePatient } from '../services/update-patient';
export const usePatientForm = () => {
  const formMethods = useForm<IPatientData>({
    defaultValues: patientDefaultValue,
    resolver: yupResolver(patientSchema),
  });

  const { mutateAsync: addPatient, isPending: isAddLoading } =
    useCreatePatient();
  const { mutateAsync: editMutation, isPending: isEditLoading } =
    useUpdatePatient();

  const onAddSubmit = async (data: IPatientData) => await addPatient(data);
  const onEditSubmit = async (data: PatientEditType) =>
    await editMutation(data);

  return {
    patientMethods: formMethods,
    onEditSubmit,
    onAddSubmit,
    isLoading: isAddLoading || isEditLoading,
  };
};
