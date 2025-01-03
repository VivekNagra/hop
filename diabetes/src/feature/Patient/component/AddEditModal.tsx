import { SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Modal } from '@shangrila-cargo/component/Modal';
import { TextFieldInput } from '@shangrila-cargo/component/Form/Input/TextField';
import { FormProvider } from '@shangrila-cargo/component/Form';
import { useModalSearchParams } from '@shangrila-cargo/hooks/useModalSearchParams';
import { usePatientForm } from '../hooks/usePatientForm';
import { useGetPatientDetails } from '../services/patient-list';
import { IPatientData } from '../types';
import { patientDefaultValue } from '../const';
import { SelectInput } from '@shangrila-cargo/component/Form/Input/Select';

export const PatientAddEditModal = () => {
  const { modalClose, searchParams, shouldOpen } = useModalSearchParams();
  const id = searchParams.get('id') ?? '';

  const { patientMethods, onAddSubmit, isLoading, onEditSubmit } =
    usePatientForm();
  const { handleSubmit, reset } = patientMethods;
  const { data: patientDetail } = useGetPatientDetails({
    id: id,
  });
  const onSubmit = async (data: IPatientData) => {
    const type = searchParams.get('type');
    if (type === 'edit') {
      await onEditSubmit({ data, id });
    } else {
      await onAddSubmit(data);
    }
    onModalClose();
  };

  const onModalClose = () => {
    reset({ ...patientDefaultValue });
    modalClose();
  };

  useEffect(() => {
    if (id && patientDetail) {
      reset({
        name: patientDetail.name,
        age: patientDetail.age,
        blood_pressure: patientDetail.blood_pressure,
        bmi: patientDetail.bmi,
        gender: patientDetail.gender,
        glucose: patientDetail.glucose,
        insulin: patientDetail.insulin,
        skin_thickness: patientDetail.skin_thickness,
        risk_factor: patientDetail.risk_factor,
      });
    }
  }, [patientDetail]);
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'others', value: 'others' },
  ];

  const riskOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'low' },
  ];
  return (
    <Modal
      isOpen={shouldOpen('edit') || shouldOpen('add')}
      onClose={onModalClose}
      size="md"
      title={id ? 'Update Patient' : 'Add Patient'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <FormProvider methods={patientMethods}>
        <SimpleGrid columns={2} gap={6}>
          <TextFieldInput name="name" label="Name" />
          <TextFieldInput name="age" label="Age" type="number" />
          <SelectInput
            name="gender"
            label="Gender"
            selectOption={genderOptions}
          />
          <TextFieldInput name="glucose" label="Glucose" type="number" />
          <TextFieldInput
            name="blood_pressure"
            label="Blood Pressure"
            type="number"
          />
          <TextFieldInput
            name="skin_thickness"
            label="Skin Thickness"
            type="number"
          />
          <TextFieldInput name="insulin" label="Insulin" type="number" />
          <TextFieldInput name="bmi" label="BMI" type="number" />
          <SelectInput
            name="risk_factor"
            label="Risk Factor"
            selectOption={riskOptions}
          />
        </SimpleGrid>
      </FormProvider>
    </Modal>
  );
};
