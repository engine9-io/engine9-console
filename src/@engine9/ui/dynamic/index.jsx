import React from 'react';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AuthWrapper from '@crema/core/AppLayout/AuthWrapper';
import Authenticated from './Authenticated';

function DynamicHome() {
  const { isAuthenticated } = useAuthUser();

  const loginUrl = `/signin?redirect=${window.location.pathname}`;

  return (
    isAuthenticated ? (
      <Authenticated />
    ) : (
      <AuthWrapper>
        Not Authenticated
        <a href={loginUrl}>Sign in now</a>
      </AuthWrapper>
    )
  );
}

export default DynamicHome;
