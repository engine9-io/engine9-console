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

export function ComponentWrapper({ configuration: _config, parameters }) {
  if (!_config) return 'No configuration specified';
  const configuration = JSON.parse(JSON.stringify(_config));
  if (Array.isArray(configuration)) {
    return configuration.map((c) => (
      <ComponentWrapper
        key={JSON.stringify(_config)}
        configuration={c}
        parameters={parameters}
      />
    ));
  }
  if (!configuration.component) {
    return (
      <div>
        No component specified in
        {JSON.stringify({ configuration: _config, parameters })}
      </div>
    );
  }
  const c = componentMap[configuration.component];
  if (!c) {
    return (
      <span>
        Component
        {' \''}
        {configuration.component || '(not specified)'}
        {'\' '}
        not available
      </span>
    );
  }
  configuration.parameters = parameters;
  let element = null;

  try {
    element = React.createElement(c, { parameters, ...configuration });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return `Error with ${configuration.component}`;
  }

  return (
    <div className="dynamic-component">
      {element}
    </div>
  );
}

export default ComponentWrapper;
