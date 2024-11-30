import React from 'react';
import { Flex } from 'antd';
import AppLoader from '@crema/components/AppLoader';
import Error500 from '@engine9/ui/errorPages/Error500';
import { useComponentArray } from '@engine9/ui/layouts/LayoutUtilities';
import { useRemoteData } from '@engine9/ui/AuthenticatedDataEndpoint';

export function Report({ properties, parameters }) {
  const { reportPath } = properties;
  if (!reportPath) return 'Report needs a path';
  const {
    isPending, error, data,
  } = useRemoteData({
    uri: `/data/reports/${reportPath}`,
    // onComplete: () => {},
  });

  if (isPending) return <AppLoader />;
  if (error) {
    return <Error500 />;
  }
  if (!data?.[0]) {
    return 'No data found';
  }

  const items = Object.entries(
    data[0].components,
  ).map(([key, c]) => {
    if (typeof c === 'string') {
      return { key, arr: <h2>{c}</h2> };
    }
    return {
      key,
      arr: useComponentArray({ component: c.component, properties: c }, parameters),
    };
  });

  return (
    <div className="e9-report">
      {items.map(({ key, arr }) => (
        <Flex justify="space-between" key={key} className="e9-report-component">
          {arr}
        </Flex>
      ))}
    </div>
  );
}

export default Report;
