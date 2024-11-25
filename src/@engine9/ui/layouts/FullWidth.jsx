import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router';
import { Flex } from 'antd';
import { useComponentArray } from './LayoutUtilities';

function FullWidth({ components }) {
  const parameters = useParams();
  let { header = [], main } = components;
  if (!main) {
    return "There is no required 'main' component for the FullWidth layout";
  }
  const headerArray = useComponentArray(header, parameters);
  const mainArray = useComponentArray(main, parameters);
  if (!Array.isArray(header)) header = [header];
  if (!Array.isArray(main))main = [main];

  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        {header.length > 0 && (
        <div className="e9-header">
          <Flex justify="space-between">
            {headerArray}
          </Flex>
        </div>
        )}
        <div className="e9-main">
          {mainArray}
        </div>
      </div>
    </StyledMainContentView>
  );
}

export default FullWidth;
