import * as Yup from 'yup';

export const patientSchema = Yup.object().shape({
  name: Yup.string().trim().required('name is required.'),
  age: Yup.string().trim().required('age is required'),
  gender: Yup.string().required('gender is required'),
  glucose: Yup.string().trim().required('glucose is required'),
  blood_pressure: Yup.string().trim().required('blood pressure is required'),
  skin_thickness: Yup.string().trim().required('skin thickness is required'),
  insulin: Yup.string().trim().required('insulin is required'),
  bmi: Yup.string().trim().required('bmi is required'),
  risk_factor: Yup.string().trim().required('Risk Factor is required'),
});
