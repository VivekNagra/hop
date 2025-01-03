import { Route } from '@shangrila-cargo/routes/AppRoutes.type';

export const filterVisibleRoutes = (routes: Route[]): Route[] => {
  return routes
    .filter((route) => route.isVisible)
    ?.map((route) => {
      if (route.children) {
        return {
          ...route,
          children: filterVisibleRoutes(route.children),
        };
      }
      return route;
    });
};
