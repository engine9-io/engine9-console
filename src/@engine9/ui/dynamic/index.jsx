import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
const DynamicLayout = React.lazy(() => import('@engine9/ui/dynamic/DynamicLayout'));

export const engine9Routes = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/dynamic',
    element: <DynamicLayout />,
  },
 
];


export default engine9Routes;
