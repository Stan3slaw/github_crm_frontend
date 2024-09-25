import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppRoutes } from './routes.enum';
import LayoutWithNavigation from '@/components/shared/layout-with-navigation/layout-with-navigation';
import AuthorizedRoute from '@/components/shared/routes/authorized-route';
import UnauthorizedRoute from '@/components/shared/routes/unauthorized-route';
import SignInPage from '@/modules/auth/pages/sign-in-page';
import SignUpPage from '@/modules/auth/pages/sign-up-page';
import ProjectsList from '@/modules/projects/projects.list';

export const appRouter = createBrowserRouter([
  {
    element: <UnauthorizedRoute />,
    children: [
      {
        path: AppRoutes.SignIn,
        element: <SignInPage />,
      },
      {
        path: AppRoutes.SignUp,
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AuthorizedRoute />,
    children: [
      {
        element: <LayoutWithNavigation />,
        children: [
          {
            path: AppRoutes.Main,
            element: <ProjectsList />,
          },
        ],
      },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default Routes;
