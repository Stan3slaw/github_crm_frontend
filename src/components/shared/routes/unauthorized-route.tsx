import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, Outlet } from 'react-router-dom';

import { checkAuth } from '@/cdk/api/api';
import { Icons } from '@/components/ui/icons';
import { AppRoutes } from '@/routes/routes.enum';

const UnauthorizedRoute: React.FC = () => {
  const { data, isLoading, isError } = useQuery('auth-status', checkAuth, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />;
  }

  if (data?.isAuth && !isError) {
    return <Navigate to={AppRoutes.Main} />;
  }

  return <Outlet />;
};

export default UnauthorizedRoute;