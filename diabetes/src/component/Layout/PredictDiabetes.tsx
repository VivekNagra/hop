import { useModalSearchParams } from '@shangrila-cargo/hooks/useModalSearchParams';
import { Modal } from '../Modal';
import { FormProvider, TextFieldInput } from '../Form';
import { SimpleGrid } from '@chakra-ui/react';
import PredictionModal from '../PredictionModal';
import { SelectInput } from '../Form/Input/Select';
import {
  IPredictPatient,
  IPredictPatientResponse,
  usePredictDiabetes,
} from '@shangrila-cargo/feature/Patient/services/create-pateint';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

export const PredictDiabetes = () => {
  const { modalClose, addModalOpen, shouldOpen } = useModalSearchParams();
  const predict = usePredictDiabetes();

  const patientSchema = Yup.object().shape({
    name: Yup.string().trim().required('name is required.'),
    age: Yup.string().trim().required('age is required'),
    gender: Yup.string().required('gender is required'),
    glucose: Yup.string().trim().required('glucose is required'),
    blood_pressure: Yup.string().trim().required('blood pressure is required'),
    skin_thickness: Yup.string().trim().required('skin thickness is required'),
    insulin: Yup.string().trim().required('insulin is required'),
    bmi: Yup.string().trim().required('bmi is required'),
  });

  const patientDefaultValue = {
    name: '',
    age: '',
    gender: '',
    glucose: '',
    blood_pressure: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
  };
  const formMethods = useForm<IPredictPatient>({
    defaultValues: patientDefaultValue,
    resolver: yupResolver(patientSchema),
  });
  const { handleSubmit, reset } = formMethods;

  const [response, setResponse] = useState<IPredictPatientResponse>({
    score: 0,
    category: '',
    risk_factor: '',
  });

  const onSubmit = async (data: IPredictPatient) => {
    const response = await predict.mutateAsync(data);
    setResponse(response?.data?.data);
    modalClose();
    reset();
    addModalOpen('showPrediction');
  };
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'others', value: 'others' },
  ];

  return (
    <>
      <Modal
        isOpen={shouldOpen('predict')}
        onClose={modalClose}
        size="md"
        title={'Predict Diabetes'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormProvider methods={formMethods}>
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
          </SimpleGrid>
        </FormProvider>
      </Modal>
      <PredictionModal data={response} />
    </>
  );
};
