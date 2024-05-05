import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from './DataTable';
import DataForm from './DataForm';
import DataDisplay from './DataDisplay';

function LinkComponent({ properties }) {
  const { to, label } = properties;
  return <Link to={to}>{label || JSON.stringify(properties)}</Link>;
}

const componentMap = {
  DataTable,
  DataForm,
  DataDisplay,
  Link: LinkComponent,
};

export function ComponentWrapper({ component, properties: _props, parameters }) {
  if (!_props) return 'No configuration specified';
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
