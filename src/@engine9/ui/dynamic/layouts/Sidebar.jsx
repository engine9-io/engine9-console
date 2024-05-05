import React from 'react';

import { ComponentWrapper } from '@engine9/ui/components/ComponentWrapper';
import { Routes, Route, useParams } from 'react-router-dom';

import AppsContainer from '@crema/components/AppsContainer';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppPageMeta from '@crema/components/AppPageMeta';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import SidebarContent from '../../components/SidebarContent';

/*
  The sidebar layout very specifically has a left sidebar that controls the behavior
  of the main body, using route paths.  It has an embedded router.
*/

function SidebarLayout({ components }) {
  const parameters = useParams();

  const { header = 'Edit person', sidebar, main } = components;
  if (!Array.isArray(main)) return 'property main for layout Sidebar must be an array of items with paths';

  return (
    <StyledMainContentView>
      <AppsContainer
        title={header}
        // sidebarContent={<ComponentWrapper properties={sidebar} />}
        sidebarContent={(
          <SidebarContent
            properties={sidebar}
            parameters={parameters}
          />
)}
      >
        <AppPageMeta title="Edit Person" />
        foo
        <AppsContent>
          <div className="e9-layout-person-tabs">
            <Routes>
              {main.map((config) => {
                const { path, component, properties } = config;
                const index = !path;// index routes are the default, if no path matches include it

                return (
                  <Route
                    key={JSON.stringify(config)}
                    path={path}
                    index={index}
                    element={(
                      <ComponentWrapper
                        component={component}
                        properties={properties}
                        parameters={parameters}
                      />
)}
                  />
                );
              })}
            </Routes>
          </div>
        </AppsContent>

      </AppsContainer>
    </StyledMainContentView>
  );
}

export default SidebarLayout;
