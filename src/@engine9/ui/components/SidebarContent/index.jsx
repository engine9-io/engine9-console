import React from 'react';

import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import SidebarPlaceholder from '@crema/components/AppSkeleton/SidebarListSkeleton';
import { NavLink } from 'react-router-dom';
import { ComponentWrapper } from '../ComponentWrapper';

import {
  StyledSidebarContent,
  StyledSidebarHeader,
  StyledSidebarList,
  StyledSidebarScrollbar,
  // StyledSidebarTitle,
  StyledSidebarItem, StyledDots,
} from './index.styled';

function SidebarItem({ label = '(No label)', to = '/', dot }) {
  return (
    <StyledSidebarItem key={`${label}:${to}`}>
      <NavLink to={to}>
        {dot && (
        <StyledDots
          className="item-dots"
          style={{ backgroundColor: dot }}
        />
        )}
        {label}
      </NavLink>
    </StyledSidebarItem>
  );
}

function SidebarContent({ properties, parameters }) {
  const { title = '', items } = properties;
  return (
    <>
      {title && (
      <StyledSidebarHeader>
        <h2>{title}</h2>
      </StyledSidebarHeader>
      )}

      <StyledSidebarScrollbar>
        <StyledSidebarContent>
          {/* <StyledSidebarTitle>Sample</StyledSidebarTitle> */}
          <StyledSidebarList
            component="nav"
            aria-label="main box folders"
          >
            <AppList
              data={items}
              ListEmptyComponent={(
                <ListEmptyResult
                  loading
                  placeholder={<SidebarPlaceholder />}
                />
                  )}
              renderItem={(item) => {
                if (item.component) {
                  return (
                    <StyledSidebarItem>
                      <ComponentWrapper
                        component={item.component}
                        properties={item.properties}
                        parameters={parameters}
                      />
                    </StyledSidebarItem>
                  );
                }
                return <SidebarItem key={item.id} label={item.label} to={item.to} dot={item.dot} />;
              }}
            />
          </StyledSidebarList>
          {/*
          <StyledSidebarList
            component="nav"
            aria-label="main box folders"
          >
            <AppList
              data={itemList}
              ListEmptyComponent={(
                <ListEmptyResult
                  loading
                  placeholder={<SidebarPlaceholder />}
                />
                  )}
              renderItem={(item) => (
                <SidebarItem key={item.id} label={item.label} to={item.to} dot={item.dot} />
              )}
            />
          </StyledSidebarList>
          <StyledSidebarTitle>
            <IntlMessages id="common.connections" />
          </StyledSidebarTitle>
*/}
        </StyledSidebarContent>
      </StyledSidebarScrollbar>
    </>
  );
}

export default SidebarContent;
