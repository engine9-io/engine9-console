import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { ComponentWrapper } from '../../components/ComponentWrapper';

function FullWidth({ components, parameters }) {
  const { body } = components;
  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        <div className="e9-body"><ComponentWrapper configuration={body} parameters={parameters} /></div>
      </div>
    </StyledMainContentView>
  );
}

export default FullWidth;
