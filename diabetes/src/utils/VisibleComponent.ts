import { MODULE_NAME } from '@shangrila-cargo/constant';

// Permission list will be provided from backend
const permissionList = {
  dashboard: ['read'],
  user: ['read', 'create'],
  cargo: ['read', 'create'],
  air_cargo: ['read', 'create'],
  user_roles: ['read'],
  user_list: ['read'],
  patient: ['read', 'create'],
};
export const isVisible = ({
  module_name,
  permission = 'read',
}: {
  module_name: (typeof MODULE_NAME)[keyof typeof MODULE_NAME];
  permission?: string;
}) => {
  const listPermission =
    permissionList[module_name as keyof typeof permissionList];

  return listPermission.includes(`${permission}`);
};
