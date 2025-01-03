export type PatientListColumnProps = {
  modalOpen: (id: string, type: string) => void;
};

export interface IPatientData {
  name: string;
  age: string;
  gender: string;
  glucose: string;
  blood_pressure: string;
  skin_thickness: string;
  insulin: string;
  bmi: string;
  risk_factor: string;
}

export type PatientEditType = {
  id: string;
  data: IPatientData;
};
