import { Navigate } from 'react-router-dom';

import { ChartSquareIcon } from '@shangrila-cargo/assets/svgs/';
import { PAGE_ROUTES } from '@shangrila-cargo/constant';
import { isVisible } from '@shangrila-cargo/utils/VisibleComponent';

// Screens
import { ForgotPassword, Login } from '@shangrila-cargo/feature/Auth/screens';
import { PatientList } from '@shangrila-cargo/feature/Patient/screens';
import { Dashboard } from '@shangrila-cargo/feature/Dashboard/screens';

export const allRoutes = [
  {
    icon: <ChartSquareIcon />,
    name: 'Dashboard',
    route: PAGE_ROUTES.DASHBOARD,
    isVisible: isVisible({ module_name: 'dashboard' }),
    element: <Dashboard />,
  },
  {
    icon: <ChartSquareIcon />,
    name: 'Patient',
    route: PAGE_ROUTES.PATIENT.LIST,
    isVisible: isVisible({ module_name: 'patient' }),
    element: <PatientList />,
  },
];

export const authRoutes = [
  {
    path: PAGE_ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: PAGE_ROUTES.AUTH.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },

  {
    path: PAGE_ROUTES.NO_MATCH,
    element: <Navigate to={PAGE_ROUTES.AUTH.LOGIN} />,
  },
];
