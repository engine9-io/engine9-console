import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router';
import { Flex } from 'antd';
import { useComponentArray } from '../layouts/LayoutUtilities';
import SampleReport from '../components/report/Sample';

export function Reports({ components }) {
  const sample = SampleReport();
  const parameters = useParams();
  const {
    aTitle, a0, a1, a2,
  } = sample.components;
  const els = [aTitle, a0, a1, a2].map((c) => useComponentArray(c, parameters));

  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        {els.map((arr) => (
          <div className="e9-report-component">
            <Flex justify="space-between">
              {arr}
            </Flex>
          </div>
        ))}
      </div>
    </StyledMainContentView>
  );
}

export default Reports;
