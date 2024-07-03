import React from 'react';
import { Link } from 'react-router-dom';
import RecordList from './RecordList';
import RecordForm from './RecordForm';
import RecordDisplay from './RecordDisplay';
import StatCard from './StatCard';

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
      {element}
    </div>
  );
}

export default ComponentWrapper;
