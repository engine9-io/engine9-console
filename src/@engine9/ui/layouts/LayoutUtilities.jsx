import React from 'react';
import { DynamicComponentWrapper } from '@engine9/ui/components/DynamicComponentWrapper';

// eslint-disable-next-line import/prefer-default-export
export function useComponentArray(_arr, parameters) {
  let arr = _arr;
  if (!Array.isArray(arr)) arr = [_arr];

  return arr.map((item) => {
    if (typeof item === 'string') return <h2 key={JSON.stringify(item)}>{item}</h2>;
    if (React.isValidElement(item)) return item;
    return (
      <DynamicComponentWrapper
        key={JSON.stringify(item)}
        component={item.component}
        properties={item.properties}
        parameters={parameters}
      />
    );
  });
}
