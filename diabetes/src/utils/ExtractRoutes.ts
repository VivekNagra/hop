import { Route } from '@shangrila-cargo/routes/AppRoutes.type';

type ExtractedRoutes = { path: string; element?: JSX.Element };

/* 
 The function takes an array of routes and extracts out
  the element and path from each one, including nested routes, and returns a flat 
  list of these details. 
*/
export function extractElementsAndRoutes(routes: Route[]) {
  let result = [] as ExtractedRoutes[];
  routes.forEach((route) => {
    result.push({ element: route.element, path: route.route });
    if (route.children) {
      result = result.concat(extractElementsAndRoutes(route.children));
    }
  });
  return result;
}
