import { Layout } from '@shangrila-cargo/component/Layout';
import { Navigate, useRoutes } from 'react-router-dom';
import { allRoutes, authRoutes } from './Routes';
import { extractElementsAndRoutes } from '@shangrila-cargo/utils';
import { PAGE_ROUTES } from '@shangrila-cargo/constant';
import { useIsAuthenticatedQuery } from '@shangrila-cargo/hooks/useIsAuthenticatedQuery';

const routes = extractElementsAndRoutes(allRoutes);

const AppRoutes = () => {
  const { data: isAuthenticated } = useIsAuthenticatedQuery();

  const element = useRoutes(
    isAuthenticated
      ? [
          {
            element: <Layout />,
            children: [
              ...routes,
              {
                path: PAGE_ROUTES.NO_MATCH,
                element: <Navigate to={PAGE_ROUTES.DASHBOARD} />,
              },
            ],
          },
        ]
      : authRoutes,
  );

  return <div>{element}</div>;
};

export { AppRoutes };
