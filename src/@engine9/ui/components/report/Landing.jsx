import React from 'react';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
import { useParams } from 'react-router';
import { Report } from '@engine9/ui/components/report/Report';

export function ReportLanding({ properties, parameters }) {
  const { '*': reportPath } = useParams();

  return (
    <StyledMainContentView>
      <div className="e9-layout-full-width">
        <Report
          properties={({ ...properties, reportPath })}
          parameters={parameters}
        />
      </div>

    </StyledMainContentView>
  );
}

export default ReportLanding;
