import React from 'react';

import { ComponentWrapper } from '@engine9/ui/components/ComponentWrapper';
import { Routes, Route } from 'react-router-dom';
import AppsContainer from '@crema/components/AppsContainer';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppPageMeta from '@crema/components/AppPageMeta';

/*
  The sidebar layout very specifically has a left sidebar that controls the behavior
  of the main body, using route paths.  It has an embedded router.
*/

function Layout({ components, parameters }) {
  const { sidebar, main } = components;
  if (!Array.isArray(main)) return 'property main for layout Sidebar must be an array of items with paths';

  return (
    <AppsContainer
        // title={messages['chatApp.chat']}
      sidebarContent={(
        <div className="e9-layout-person-sidebar">
          <ComponentWrapper configuration={sidebar} parameters={parameters} />
        </div>
        )}
    >
      <AppPageMeta title="Edit Person" />
      foo
      <AppsContent>
        <div className="e9-layout-person-tabs">
          <Routes>
            {main.map((config) => {
              const { path } = config;
              const index = !path;// index routes are the default, if no path matches include it

              return (
                <Route
                  key={JSON.stringify(config)}
                  path={path}
                  index={index}
                  element={<ComponentWrapper configuration={config} parameters={parameters} />}
                />
              );
            })}
          </Routes>
        </div>
      </AppsContent>

    </AppsContainer>
  );
}

export default Layout;
