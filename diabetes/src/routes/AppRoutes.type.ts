export type Route = {
  icon: JSX.Element;
  name: string;
  route: string;
  isVisible: boolean;
  element?: JSX.Element;
  children?: Route[];
};
