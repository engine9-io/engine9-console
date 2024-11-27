/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Area,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, CartesianGrid,
  Line, YAxis, Legend, ReferenceArea,
} from 'recharts';
import queryString from 'query-string';
import { Typography, Row, Col } from 'antd';

import { relativeDate, formatValue } from '@engine9/helpers/formatters';
import { useColorFunc } from './Colors';

export default function ReportComposedChart({ properties }) {
  const {
    metrics, breakdown: _breakdown, displayMax = 5, isDate, name = '', qs,
    dimensionName, stack,
  } = properties;
  let { data = [] } = properties;
  const getColor = useColorFunc();
  const [refAreaLeft, setLeft] = useState();
  const [refAreaRight, setRight] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  if (data.length === 0) {
    return (
      <>
        {name && <Typography className="report-item-name" variant="h6">{name}</Typography>}
        No data available
      </>
    );
  }
  let breakdown = [].concat(_breakdown).filter(Boolean);
  if (breakdown.length > 1) throw new Error('Only one breakdown field allowed');
  [breakdown] = breakdown;

  function xFormat(val) {
    // console.log("Formatting ",val);
    const v = isDate ? formatValue(val, 'utcdate') : val;
    // console.log("Formatted ",v);
    return v;
  }

  let xName = dimensionName || 'dimension_name';
  if (!data[0][xName] && data[0].col0) xName = 'col0';

  const formattersByName = {};
  metrics.forEach((f) => {
    formattersByName[f.name] = (val) => formatValue(val, f.format);
  });

  let displayMetrics = metrics;
  const total = {};
  if (breakdown) {
    const distinctBreakdown = data.reduce((a, d) => {
      a[d[breakdown.name]] = (a[d[breakdown.name]] || 0) + 1; return a;
    }, {});
    let keyCount = Object.keys(distinctBreakdown)
      .map((key) => ({ key, count: distinctBreakdown[key] }))
      .sort((a, b) => (a.count < b.count ? 1 : -1));
    let validValueLookup = null;
    if (keyCount.length > displayMax) {
      keyCount = keyCount.slice(0, displayMax);
      validValueLookup = keyCount.reduce((a, b) => { a[b.key] = true; return a; }, {});
      keyCount.push({ key: '(Other)' });
    }
    const newData = {};
    data.forEach((d) => {
      newData[d[xName]] = newData[d[xName]] || {};// Create an object
      newData[d[xName]][xName] = d[xName]; // set the date
      const value = d[metrics[0].name];
      if (validValueLookup && !validValueLookup[d[breakdown.name]]) {
        total['(Other)'] = (total['(Other)'] || 0) + value;
        newData[d[xName]]['(Other)'] = (newData[d[xName]]['(Other)'] || 0) + value;
      } else {
        total[d[breakdown.name]] = (total[d[breakdown.name]] || 0) + value;
        newData[d[xName]][d[breakdown.name]] = (newData[d[xName]][d[breakdown.name]] || 0)
         + value;
      }
    });
    data = Object.values(newData);

    displayMetrics = [].concat(keyCount.map((d) => {
      formattersByName[d.key] = (val) => formatValue(val, metrics[0].format);
      return {
        names: d.key, yAxis: breakdown.yAxis, type: 'bar', stackId: 'stackA',
      };
    }));
  }

  let leftPad = 30;
  let rightPad = 0;
  if (metrics && metrics[0] && metrics[0].type === 'bar') {
    if (data.length < 3) {
      leftPad = 300; rightPad = 0;
    } else if (data.length < 5) {
      leftPad = 250; rightPad = 0;
    } else if (data.length < 10) {
      leftPad = 90; rightPad = 0;
    } else if (data.length < 20) {
      leftPad = 50; rightPad = 0;
    }
    // return JSON.stringify({length:data.length,leftPad,rightPad});
  }

  let xaxis = <XAxis dataKey={xName} tickFormatter={xFormat} />;
  let domain = null;

  if (isDate) {
    // Set the domain based on the resulting querystring coming from the server
    // domain=[relativeDate("-3M").getTime(),relativeDate("now").getTime()];
    domain = ['auto', 'auto'];
    if (qs) {
      if (qs.start) domain[0] = relativeDate(qs.start).getTime();
      if (qs.end) {
        domain[1] = relativeDate(qs.end).getTime();
      }
    }

    xaxis = (
      <XAxis
        dataKey={xName}
        domain={domain}
        scale="time"
        type="number"
        padding={{ left: leftPad, right: rightPad }}
        tickFormatter={xFormat}
      />
    );
  }

  if (breakdown) breakdown.name = breakdown.name || '_breakdown';

  let rightAxis = null;
  if (metrics.find((d) => d.yaxis === 'right')) {
    const r1 = metrics.find((d) => d.yaxis === 'right');
    rightAxis = (
      <YAxis
        yAxisId="right"
        orientation="right"
        tickFormatter={(val) => formatValue(val, r1.format)}
        type="number"
        domain={[0, 500000]}
      />
    );
  }
  // find the first left format
  const left1 = metrics.find((d) => d.yaxis !== 'right') || {};
  function yFormatLeft(val) { return formatValue(val, left1.format); }
  data = data.map((d) => {
    if (!isDate) return d;
    if (String(d[xName]).length === 4) {
      d[xName] = new Date(`${String(d[xName])}-01-01`).getTime(); // fix for year functions that don't return full date format
    } else {
      d[xName] = new Date(d[xName]).getTime();
    }
    if (domain && d[xName] < domain[0]) {
      return false;
    }
    if (domain && d[xName] > domain[1]) return false;
    return d;
  }).filter(Boolean);

  function zoom() {
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setLeft('');
      setRight('');
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      setLeft(refAreaRight);
      setRight(refAreaLeft);
    }

    const query = queryString.parse(location.search) || {};
    query.start = refAreaLeft;
    query.end = refAreaRight;
    navigate({ location: location.pathname, search: queryString.stringify(query) });

    setLeft(null);
    setRight(null);
  }

  if (isDate) {
    data.sort((a, b) => (a[xName] < b[xName] ? -1 : 1));
  }

  return (
    <Row className="h-100 w-100 report-bar-chart">
      {name && (
      <Col span={24}>
        <Typography className="report-item-name" variant="h6">{name}</Typography>
      </Col>
      )}
      <Col span={24}>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data.slice(0, 50)}
            margin={{
              top: 20, right: 10, bottom: 0, left: 25,
            }}
            onMouseDown={isDate ? (e) => { if (e) setLeft(e.activeName); } : null}
            onMouseMove={isDate ? (e) => e && refAreaLeft && setRight(e.activeName) : null}
            onMouseUp={isDate ? (e) => e && zoom() : null}
          >
            <defs>
              <filter x="0" y="-10%" id="lineBlur">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="offsetBlur" />
                <feOffset dx="0" dy="10" />
                <feBlend in="SourceGraphic" mode="multiply" />
              </filter>
              <filter id="lineShadow" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
                <feOffset in="blur" dx="0" dy="7" result="offsetBlur" />
                <feFlood floodColor="#006991" floodOpacity="0.5" result="offsetColor" />
                <feComposite
                  in="offsetColor"
                  in2="offsetBlur"
                  operator="in"
                  result="offsetBlur"
                />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid />
            {xaxis}
            <YAxis
              yAxisId="left"
              tickFormatter={yFormatLeft}
              type="number"
              domain={[0, '100000000']}
            />
            {rightAxis}
            <Tooltip
              nameFormatter={(value) => (isDate ? formatValue(value, 'utcdate') : value)}
              formatter={
                (value, n) => {
                  if (typeof formattersByName[n] === 'function') {
                    return formattersByName[n](value);
                  }
                  return value;
                }
              }
            />
            <Legend />
            {displayMetrics.map((f, i) => {
              const key = `key${i}`;
              const color = f.color || getColor(i, f.name);
              let dot = null;
              if (data.length < 40) {
                dot = {
                  fill: color,
                  stroke: '#FFF',
                  strokeWidth: 5,
                  r: 6,
                  filter: 'none',
                };
              }
              switch (f.type) {
                case 'bar': return <Bar key={key} yAxisId={f.yaxis || 'left'} name={f.name} dataKey={f.name} stackId={f.stackId || (stack ? 'stackA' : '') || null} fill={color} />;
                case 'area': return <Area key={key} yAxisId={f.yaxis || 'left'} type="linear" name={f.name} dataKey={f.name} fill={color} stroke={color} />;
                default: return <Line type="monotone" dot={dot} connectNulls={false} key={key} name={f.name} yAxisId={f.yaxis || 'left'} dataKey={f.name} stroke={color} filter="url(#lineShadow)" />;
              }
            })}
            {
                (refAreaLeft && refAreaRight) ? (
                  <ReferenceArea yAxisId="left" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
            }
          </ComposedChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
}
