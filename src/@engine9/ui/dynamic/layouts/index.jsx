import React, { useState } from 'react';
import clsx from 'clsx';
import { FooterType } from '@crema/constants/AppEnums';
// import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { appendIcons } from '@engine9/ui/Icons';
import { Routes, Route, useParams } from 'react-router-dom';
import AppSidebar from '@crema/components/AppLayout/MiniSidebarToggle/AppSidebar';
import AppHeader from '@crema/components/AppLayout/MiniSidebarToggle/AppHeader';
import AppThemeSetting from '@crema/components/AppThemeSetting';
import AppFooter from '@crema/components/AppLayout/components/AppFooter';
import {
  StyledAppLayoutMiniSidebar,
  StyledAppLayoutMiniSidebarMain,
  StyledMainMiniScrollbar,
} from '@crema/components/AppLayout/MiniSidebarToggle/index.styled';

import FullWidth from './FullWidth';
import Sidebar from './Sidebar';

function LayoutPicker({ layout, components }) {
  const parameters = useParams();
  switch (layout) {
    case 'sidebar': return <Sidebar components={components} parameters={parameters} />;
    default: return <FullWidth components={components} parameters={parameters} />;
  }
}

function LayoutHome({ menuConfig, routeConfig }) {
  const [isCollapsed, setCollapsed] = useState(false);
  // const { footer, footerType } = useLayoutContext();
  const footer = false; const footerType = false;// not sure whats up with the layout context
  const menuConfigWithIcons = appendIcons(menuConfig);

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <StyledAppLayoutMiniSidebar
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} routesConfig={menuConfigWithIcons} />
      <StyledAppLayoutMiniSidebarMain className="app-layout-mini-sidebar-main">
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledMainMiniScrollbar>
          <Routes>
            {routeConfig.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={(
                  <LayoutPicker
                    layout={r.layout}
                    components={r.components}
                  />
                )}
              />
            ))}
            <Route path="*" element={<div>Path not found</div>} />
          </Routes>
          <AppFooter />
        </StyledMainMiniScrollbar>
      </StyledAppLayoutMiniSidebarMain>
      <AppThemeSetting />
    </StyledAppLayoutMiniSidebar>
  );
}

export default LayoutHome;
