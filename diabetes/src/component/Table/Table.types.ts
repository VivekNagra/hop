import { TableOptions } from '@tanstack/react-table';

export type TableProps<T> = {
  data: T[];
  columns: TableOptions<T>['columns'];
  isPending?: boolean;
  isRowEditing?: boolean;
  headerProps?: TableHeaderProps;
  totalCount?: number;
};

export type TableHeaderProps = {
  headerTitle?: string;
  onButtonClick?: () => void;
  buttonTitle?: string;
  children?: React.ReactNode;
};

export type TableActionsProps = {
  onView?: () => void;
  onCheck?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type TableFooterProps = {
  totalCount?: number;
};
