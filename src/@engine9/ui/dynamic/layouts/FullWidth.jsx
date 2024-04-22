import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { ComponentWrapper } from '../../components/ComponentWrapper';

function FullWidth({ components, parameters }) {
  const { main } = components;
  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        <div className="e9-main"><ComponentWrapper configuration={main} parameters={parameters} /></div>
      </div>
    </StyledMainContentView>
  );
}

export default FullWidth;
