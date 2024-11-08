import React from 'react';

import { DynamicComponentWrapper } from '@engine9/ui/components/DynamicComponentWrapper';
import { Routes, Route, useParams } from 'react-router-dom';

import AppsContainer from '@crema/components/AppsContainer';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
// import AppPageMeta from '@crema/components/AppPageMeta';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
// import SidebarContent from '@engine9/ui/components/SidebarContent';
import { Flex } from 'antd';
import { useComponentArray } from './LayoutUtilities';

/*
  The sidebar layout very specifically has a left sidebar that controls the behavior
  of the main body, using route paths.  It has an embedded router.
*/

function SidebarLayout({ components }) {
  const parameters = useParams();

  const { header = [], sidebar = [], main = [] } = components;
  if (!Array.isArray(main)) return 'property main for layout Sidebar must be an array of items with paths';

  if (!main) {
    return "There is no required 'main' component for the Sidebar layout";
  }
  const headerArray = useComponentArray(header, parameters);
  const sidebarElements = [].concat(sidebar).map((config) => {
    // if (!config) return '';
    const { component, properties } = config;

    return (
      <DynamicComponentWrapper
        component={component}
        properties={properties}
        parameters={parameters}
      />
    );
  });

  return (
    <StyledMainContentView>
      {header.length > 0 && (
        <div className="e9-header">
          <Flex justify="space-between">
            {headerArray}
          </Flex>
        </div>
      )}
      <AppsContainer
        sidebarContent={sidebarElements}
      >
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
                      <DynamicComponentWrapper
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
