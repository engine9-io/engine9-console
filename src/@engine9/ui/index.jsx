import React from 'react';

const Dynamic = React.lazy(() => import('@engine9/ui/dynamic'));

export default function UI() {
  return <Dynamic />;
}
