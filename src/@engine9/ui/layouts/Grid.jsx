import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router';
import { DynamicComponentWrapper } from '@engine9/ui/components/DynamicComponentWrapper';

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
          {main.map((item) => {
            if (typeof item === 'string') return <h2 key={JSON.stringify(item)}>{item}</h2>;
            if (React.isValidElement(item)) return item;
            return (
              <DynamicComponentWrapper
                key={JSON.stringify(item)}
                component={item.component}
                properties={item.properties}
                parameters={parameters}
              />
            );
          })}
        </div>
      </div>
    </StyledMainContentView>
  );
}

export default Grid;
