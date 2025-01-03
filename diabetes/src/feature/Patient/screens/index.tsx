import { DataTable } from '@shangrila-cargo/component/Table';
import { usePatientListColumn } from '../columns/patient.column';
import { useGetPatientList } from '../services/patient-list';
import { useModalSearchParams } from '@shangrila-cargo/hooks/useModalSearchParams';
import { useDeletePatient } from '../services/delete-patient';
import { DeleteModal } from '@shangrila-cargo/component/Modal/Delete';
import { usePatientForm } from '../hooks/usePatientForm';
import { patientDefaultValue } from '../const';
import { PatientAddEditModal } from '../component/AddEditModal';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import Select from 'react-select';
import { useUpdateQueryParam } from '@shangrila-cargo/hooks';
import { useState } from 'react';
import { Filter } from './filter';

export const PatientList = () => {
  const patientList = useGetPatientList();
  const [sortBy, setSortBy] = useState('');
  const { isOpen, onClose } = useDisclosure();
  const { modalClose, modalOpen, searchParams, shouldOpen, addModalOpen } =
    useModalSearchParams();

  const { patientMethods } = usePatientForm();
  const { mutateAsync, isPending: deleteLoading } = useDeletePatient();
  const onDeleteSubmit = async () => {
    await mutateAsync(searchParams.get('deleteId') ?? '');
    closeModal();
  };

  const closeModal = () => {
    patientMethods.reset({ ...patientDefaultValue });
    modalClose();
  };

  const options = [
    { label: 'BMI High to Low', value: 'bmi_high_to_low' },
    { label: 'BMI Low to High', value: 'bmi_low_to_high' },
    { label: 'Glucose High to Low', value: 'glucose_high_to_low' },
    { label: 'Glucose Low to High', value: 'glucose_low_to_high' },
    { label: 'Insulin Low to High', value: 'insulin_low_to_high' },
    { label: 'Insulin High to Low', value: 'insulin_high_to_low' },
  ];
  useUpdateQueryParam('sort', sortBy);
  return (
    <div>
      <DeleteModal
        title="Delete"
        isLoading={deleteLoading}
        isOpen={shouldOpen('delete')}
        onClose={closeModal}
        onSubmit={onDeleteSubmit}
      >
        Are you sure you want to delete?
      </DeleteModal>
      <PatientAddEditModal />
      <Flex justifyContent={'end'} alignItems={'center'} gap={3}>
        <Flex alignItems={'center'} gap={2}>
          <Text>Sort by</Text>
          <Select
            options={options}
            onChange={(value) => setSortBy(value?.value ?? '')}
            placeholder="Select option"
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                width: '200px',
                fontSize: '14px',
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'gray.500',
                fontSize: '14px',
              }),

              control: (baseStyles) => ({
                ...baseStyles,
                paddingLeft: 4,
                paddingRight: 4,
                height: '40px',
                width: '200px',

                background: 'transparent',
                boxShadow: 'none',
                borderRadius: '6px',
              }),
            }}
          />
        </Flex>
        {/* <IconButton
          aria-label="Search database"
          onClick={onOpen}
          icon={
            <FilterIcon
              style={{
                fill: '#fff',
                stroke: '#fff',
              }}
            />
          }
        />
        <Text>Reset</Text> */}
      </Flex>

      <DataTable
        columns={usePatientListColumn({ modalOpen })}
        data={patientList.data?.data ?? []}
        totalCount={patientList.data?.meta.total_records}
        headerProps={{
          headerTitle: 'Patient List',
          buttonTitle: 'Add Patient',
          onButtonClick: addModalOpen,
        }}
      ></DataTable>
      <Filter isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
