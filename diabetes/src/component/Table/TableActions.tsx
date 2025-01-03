import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import {
  EditIcon,
  EyeOpenIcon,
  TickIcon,
  TrashIcon,
} from '@shangrila-cargo/assets/svgs';
import { TableActionsProps } from './Table.types';

export const TableActions = ({
  onView,
  onCheck,
  onEdit,
  onDelete,
}: TableActionsProps) => {
  return (
    <Flex alignItems="center" justifyContent="start">
      {!!onView && (
        <Tooltip>
          <IconButton
            aria-label="View"
            icon={<EyeOpenIcon />}
            background="transparent"
            color="blue.500"
            _hover={{
              color: 'blue.600',
              background: 'transparent',
            }}
            _focus={{
              backgroundColor: 'transparent',
            }}
            onClick={onView}
          />
        </Tooltip>
      )}
      {!!onCheck && (
        <Tooltip>
          <IconButton
            aria-label="Check"
            icon={<TickIcon />}
            background="transparent"
            color={'green.300'}
            _hover={{
              color: 'green.700',
              background: 'transparent',
            }}
            _focus={{
              backgroundColor: 'transparent',
            }}
            onClick={onCheck}
          />
        </Tooltip>
      )}
      {!!onEdit && (
        <Tooltip>
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            background="transparent"
            color={'green.300'}
            _hover={{
              color: 'green.700',
              background: 'transparent',
            }}
            _focus={{
              backgroundColor: 'transparent',
            }}
            onClick={onEdit}
          />
        </Tooltip>
      )}

      {!!onDelete && (
        <Tooltip>
          <IconButton
            aria-label="Delete"
            icon={<TrashIcon />}
            background="transparent"
            color={'red.300'}
            _hover={{
              color: 'red.700',
              background: 'transparent',
            }}
            _focus={{
              backgroundColor: 'transparent',
            }}
            onClick={onDelete}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
