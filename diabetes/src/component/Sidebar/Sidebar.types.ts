import { Route } from '@shangrila-cargo/routes/AppRoutes.type';

export type NavItemProps = {
  icon: JSX.Element;
  name: string;
  route: string;
  isOpen: boolean;
  children?: Route[];
};

export type SidebarProps = {
  isCollapsed: boolean;
  sidebarWidth?: string;
};

export type ChildNavItemProps = {
  child: Route[];
  isOpen: boolean;
  parent: {
    icon: JSX.Element;
    name: React.ReactNode;
  };
};
