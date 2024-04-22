import React from 'react';
import DataTable from './DataTable';
import DataForm from './DataForm';

const componentMap = {
  DataTable,
  DataForm,
};

export function ComponentWrapper({ configuration: _config, parameters }) {
  console.log(new Date().toISOString(), 'refreshing');
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
        {JSON.stringify({ configuration, parameters })}
      </div>
    );
  }
  const c = componentMap[configuration.component];
  if (!c) {
    return (
      <span>
        Component
        {configuration.component || '(not specified)'}
        {' '}
        not available
      </span>
    );
  }
  configuration.parameters = parameters;
  let element = null;

  try {
    element = React.createElement(c, configuration);
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
