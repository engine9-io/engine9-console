import React from 'react';
import { Card } from 'antd';

export default function ReportCard(props) {
  const {
    title, subheader, contents, className, children,
  } = props;
  return (
    <Card elevation={0} className={`report-card${className ? ` ${className}` : ''}`}>
      {title && <h2>{title}</h2>}
      <div className="report-card-header">
        {subheader}
      </div>
      {contents || children}
    </Card>
  );
}
