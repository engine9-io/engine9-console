import React, { useState } from 'react';
import clsx from 'clsx';
import { FooterType } from '@crema/constants/AppEnums';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppSidebar from '@crema/components/AppLayout/MiniSidebarToggle/AppSidebar';
import AppHeader from '@crema/components/AppLayout/MiniSidebarToggle/AppHeader';
import AppThemeSetting from '@crema/components/AppThemeSetting';
import AppFooter from '@crema/components/AppLayout/components/AppFooter';
import {
  StyledAppLayoutMiniSidebar,
  StyledAppLayoutMiniSidebarMain,
  StyledMainMiniScrollbar,
} from '@crema/components/AppLayout/MiniSidebarToggle/index.styled';

function LayoutHome({ menuConfig, routeConfig }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, footerType } = useLayoutContext();

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
      <AppSidebar isCollapsed={isCollapsed} routesConfig={menuConfig} />
      <StyledAppLayoutMiniSidebarMain className="app-layout-mini-sidebar-main">
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledMainMiniScrollbar>
          {JSON.stringify({ menuConfig, routeConfig }, null, <br />)}
          <AppFooter />
        </StyledMainMiniScrollbar>
      </StyledAppLayoutMiniSidebarMain>
      <AppThemeSetting />
    </StyledAppLayoutMiniSidebar>
  );
}

export default LayoutHome;
