import React, { useState } from 'react';
import clsx from 'clsx';
import { FooterType } from '@crema/constants/AppEnums';
// import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { appendIcons } from '@engine9/ui/Icons';
import { Routes, Route } from 'react-router-dom';
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
import GridLayout from './Grid';

function LayoutPicker({ layout, components }) {
  switch (layout) {
    case 'grid': return <GridLayout components={components} />;
    case 'sidebar': return <Sidebar components={components} />;
    default: return <FullWidth components={components} />;
  }
}

function LayoutHome({ menuConfig, routeConfig }) {
  const [isCollapsed, setCollapsed] = useState(false);
  // const { footer, footerType } = useLayoutContext();
  const footer = false; const footerType = false;
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
