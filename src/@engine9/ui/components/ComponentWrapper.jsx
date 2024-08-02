import React from 'react';
import { Link } from 'react-router-dom';
import AppErrorBoundary from '@crema/components/AppErrorBoundary';
import Button from './Button';
import RecordList from './RecordList';
import RecordForm from './RecordForm';
import RecordDisplay from './RecordDisplay';
import StatCard from './StatCard';
import Profile from './Profile';
// import QueryBuilder from './QueryBuilder';
import RecordQueryBuilder from './RecordQueryBuilder';

function LinkComponent({ properties }) {
  const { to, label } = properties;
  return <Link to={to}>{label || JSON.stringify(properties)}</Link>;
}

const componentMap = {
  RecordList,
  RecordForm,
  RecordDisplay,
  StatCard,
  Link: LinkComponent,
  Button,
  Profile,
  RecordQueryBuilder,
};

export function ComponentWrapper({ component, properties: _props = {}, parameters }) {
  const properties = JSON.parse(JSON.stringify(_props));
  if (Array.isArray(properties)) {
    return properties.map((p) => (
      <ComponentWrapper
        key={JSON.stringify(_props)}
        component={p.component}
        properties={p.properties}
        parameters={parameters}
      />
    ));
  }
  if (!component) {
    return (
      <div>
        No component specified in
        {JSON.stringify({ properties, parameters })}
      </div>
    );
  }
  const c = componentMap[component];
  if (!c) {
    return (
      <span>
        Component
        {' \''}
        {component || '(not specified)'}
        {'\' '}
        not available
      </span>
    );
  }

  let element = null;

  try {
    element = React.createElement(c, { parameters, properties });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return `Error with ${component}`;
  }

  return (
    <div className="dynamic-component">
      <AppErrorBoundary>{element}</AppErrorBoundary>
    </div>
  );
}

export default ComponentWrapper;
