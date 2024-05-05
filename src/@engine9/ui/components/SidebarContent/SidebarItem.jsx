import React from 'react';
import { NavLink } from 'react-router-dom';
import { StyledSidebarItem, StyledDots } from './index.styled';

function LabelItem({ label = '(No label)', to = '/', dot }) {
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

export default LabelItem;
