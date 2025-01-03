import { TableActions } from '@shangrila-cargo/component/Table/TableActions';
import { IPatientResponse } from '../services/patient-list';
import { PatientListColumnProps } from '../types';
import { ColumnDef } from '@tanstack/react-table';
export const usePatientListColumn = ({
  modalOpen,
}: PatientListColumnProps): Array<ColumnDef<IPatientResponse>> => {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },

    {
      accessorKey: 'age',
      header: 'Age',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'glucose',
      header: 'Glucose',
    },

    {
      accessorKey: 'blood_pressure',
      header: 'Blood Pressure',
    },

    {
      accessorKey: 'skin_thickness',
      header: 'SKin Thickess',
    },
    {
      accessorKey: 'insulin',
      header: 'Insulin',
    },
    {
      accessorKey: 'bmi',
      header: 'BMI',
    },
    {
      accessorKey: 'risk_factor',
      header: 'Risk Factor',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row: { original } }) => {
        return (
          <>
            <TableActions
              onEdit={() => {
                modalOpen(original.id, 'edit');
              }}
              onDelete={() => {
                modalOpen(original.id, 'delete');
              }}
            />
          </>
        );
      },
    },
  ];
};
