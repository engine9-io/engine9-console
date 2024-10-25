import React from 'react';
import PropTypes from 'prop-types';
import { LayoutDirection } from '@crema/constants/AppEnums';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import {
  StyledInnerSidebar,
  StyledInnerSidebarCard,
  StyledInnerSidebarDrawer,
} from './index.styled';

const InnerSidebar = (props) => {
  const { isAppDrawerOpen, setAppDrawerOpen, sidebarContent, title } = props;
  const { direction } = useLayoutContext();

  return (
    <StyledInnerSidebar>
      <StyledInnerSidebarDrawer
        title={title}
        placement={direction === LayoutDirection.LTR ? 'left' : 'right'}
        open={isAppDrawerOpen}
        onClose={() => setAppDrawerOpen(!isAppDrawerOpen)}
      >
        {sidebarContent}
      </StyledInnerSidebarDrawer>
      <StyledInnerSidebarCard style={{ borderRadius: 0 }}>
        {sidebarContent}
      </StyledInnerSidebarCard>
    </StyledInnerSidebar>
  );
};

export default InnerSidebar;
