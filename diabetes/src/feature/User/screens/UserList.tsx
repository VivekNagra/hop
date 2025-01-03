import { DataTable } from '@shangrila-cargo/component/Table';
import { useUserListColumn } from '../columns/userList.columns';
import { Modal } from '@shangrila-cargo/component/Modal';
import { useDisclosure } from '@chakra-ui/react';

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export const UserList = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onToggle} title="Hello">
        <div>click</div>
      </Modal>
      <DataTable
        columns={useUserListColumn()}
        data={defaultData}
        headerProps={{
          headerTitle: 'User List',
          buttonTitle: 'Add User',
          onButtonClick: () => onToggle(),
        }}
      />
    </div>
  );
};
