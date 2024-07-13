import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';
import { ComponentWrapper } from '../../components/ComponentWrapper';

function FullWidth({ components }) {
  const parameters = useParams();
  const { header, main } = components;
  if (!main) {
    return "There is no required 'main' component for the FullWidth layout";
  }
  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        {header?.length && (
        <div className="e9-header">
          <Flex justify="space-between">
            {header.map((item) => (
              typeof item === 'string' ? <h2>{item}</h2> : (
                <ComponentWrapper
                  key={JSON.stringify(item)}
                  component={item.component}
                  properties={item.properties}
                  parameters={parameters}
                />
              )
            ))}
          </Flex>
        </div>
        )}
        <div className="e9-main">
          {main.map((item) => (
            <ComponentWrapper
              key={JSON.stringify(item)}
              component={item.component}
              properties={item.properties}
              parameters={parameters}
            />
          ))}
        </div>
      </div>
    </StyledMainContentView>
  );
}

export default FullWidth;
