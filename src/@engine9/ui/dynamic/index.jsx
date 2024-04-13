import React from 'react';
import Test from '@engine9/data/test'
import { RoutePermittedRole } from '@crema/constants/AppEnums';


const TestData = React.lazy(() => import('../../data/test'));

export const engine9Routes = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/testdata',
    element: <TestData />,
  },
 
];


export default engine9Routes;
