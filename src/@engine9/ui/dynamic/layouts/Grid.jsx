import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router-dom';
import { ComponentWrapper } from '../../components/ComponentWrapper';

function Grid({ components }) {
  if (!components) return 'No components';
  const parameters = useParams();

  const { main } = components;
  if (!main) {
    return "There is no required 'main' component for the FullWidth layout";
  }
  return (
    <StyledMainContentView>
      <div className="e9-layout-grid">
        <div className="e9-main">
          <ComponentWrapper configuration={main} parameters={parameters} />
        </div>
      </div>
    </StyledMainContentView>
  );
}

export default Grid;
