import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import SidebarPlaceholder from '@crema/components/AppSkeleton/SidebarListSkeleton';
import { NavLink } from 'react-router-dom';
import {
  blue, green, grey, red,
} from '@ant-design/colors';
import { ComponentWrapper } from '../ComponentWrapper';

import {
  StyledSidebarContent,
  StyledSidebarHeader,
  StyledSidebarList,
  StyledSidebarScrollbar,
  StyledSidebarTitle,
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

const itemList = [
  {
    id: 211,
    label: 'Crema',
    to: 'crema',
    dot: red[5],
  },
  {
    id: 212,
    label: 'Personal',
    to: 'personal',
    dot: blue[5],
  },
  {
    id: 213,
    label: 'Work',
    to: 'work',
    dot: green[5],
  },
  {
    id: 214,
    label: 'Paypal',
    to: 'paypal',
    dot: grey[5],
  },
];

function SidebarContent({ properties, parameters }) {
  const { title = 'SidebarHeader', items } = properties;
  return (
    <>
      <StyledSidebarHeader>
        <h2>{title}</h2>
      </StyledSidebarHeader>

      <StyledSidebarScrollbar>
        <StyledSidebarContent>
          <StyledSidebarTitle>
            Sample
          </StyledSidebarTitle>
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
          <StyledSidebarTitle>
            Sample
          </StyledSidebarTitle>
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
        </StyledSidebarContent>
      </StyledSidebarScrollbar>
    </>
  );
}

export default SidebarContent;
