import React from 'react';
import { Typography } from 'antd';
import { formatValue } from '@engine9/helpers/formatters';

export default function Scorecard({ properties }) {
  const {
    metrics = [], label, size = 'md', previousData: prevData, data, query,
  } = properties;
  let { metric, includePrevious = false } = properties;
  includePrevious = includePrevious !== false;
  // support dynamic queries
  if (!metric && query && query.fields) [metric] = query.fields;
  if (!metric && metrics?.[0]) [metric] = metrics;

  let variants = ['h6', 'h4'];
  switch (size) {
    case 'xxs': variants = ['subtitle1', 'body1', 'body1']; break;
    case 'xs': variants = ['subtitle1', 'body1', 'body1']; break;
    case 'sm': variants = ['body1', 'h6', 'body1']; break;
    case 'md': variants = ['h6', 'h4', 'h6']; break;
    case 'lg': variants = ['h4', 'h2', 'h4']; break;
    default: variants = ['h6', 'h4']; break;
  }

  if (data.length > 1) { return 'Invalid query, more than one result'; }
  if (data.length === 0) {
    return (
      <>
        {label && <Typography className="report-item-label" variant="h6">{label}</Typography>}
        No data available
      </>
    );
  }
  if (!data[0]) return 'No Data';
  let val = null;
  let metricName = 'value';
  if (metric.name) {
    metricName = metric.name;
    val = data[0][metricName];
  } else {
    [val] = Object.values(data[0]);
  }

  let statRender = formatValue(val, metric.format) || 'N/A';
  let className;
  if (metric?.success_threshold != null) {
    if (val > parseFloat(metric.success_threshold)) className = 'text-success';
    else className = 'text-danger';
  } else if (metric?.danger_threshold != null) {
    if (val < parseFloat(metric.danger_threshold)) className = 'text-success';
    else className = 'text-danger';
  }

  if (className) statRender = <span className={className}>{statRender}</span>;
  let item = null;

  if (metrics?.[1]) {
    const m = metrics?.[1];
    item = formatValue(data[0][m.name], m.format);
  } else if (!includePrevious) {
    item = null;
  } else if (!prevData[0][metricName] || prevData[0][metricName] === 0) {
    item = null;
  } else {
    const prev = prevData[0][metricName];
    const diff = val - prev;
    const prevPercent = prev ? formatValue(diff / prev, 'percent') : 'N/A';
    if (diff === 0) {
      item = 'No change';
    } else if (diff >= 0) {
      item = (
        <span className="text-success">
          vs.
          {formatValue(prev, metric.format)}
          {' '}
          (+
          {prevPercent}
          )
        </span>
      );
    } else {
      item = (
        <span className="text-danger">
          vs.
          {formatValue(prev, metric.format)}
          {' '}
          (
          {prevPercent}
          )
        </span>
      );
    }
  }

  return (
    <div className="scorecard" style={{ textAlign: 'center' }}>
      {label && <Typography fontWeight="fontWeightBold" className="report-item-label" variant={variants[0]}><span className="resize1.5">{label}</span></Typography>}
      <Typography variant={variants[1]} className="report-scorecard-stat">{statRender}</Typography>
      <Typography variant={variants[2]}>{item}</Typography>
    </div>
  );
}
