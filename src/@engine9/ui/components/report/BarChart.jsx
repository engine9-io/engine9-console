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

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { relativeDate, formatValue } from '@engine9/helpers/formatters';
import { useColorFunc } from './colors';

export function Delta(props) {
  const {
    label, value, percent, format,
  } = props;
  let className = '';
  if (value > 0) {
    className = 'text-success';
  } else if (value < 0) {
    className = 'text-danger';
  }

  return (
    <div className="d-flex p-3 justify-content-around align-middle text-center">
      <div>
        <strong>{label}</strong>
        <div className={className}>
          <Typography variant="h4">{formatValue(value, format)}</Typography>
          <Typography variant="h5">
            {formatValue(percent, 'percent')}
            {value > 0 && <FaArrowUp />}
            {value < 0 && <FaArrowDown />}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default function BarChart({ parameters, properties }) {
  const {
    metrics, breakdown: _breakdown, displayMax = 5, isDate, label = '', qs,
    dimensionName, stack,
  } = properties;
  let { data = [], delta } = properties;
  const getColor = useColorFunc();
  const [refAreaLeft, setLeft] = useState();
  const [refAreaRight, setRight] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  if (data.length === 0) {
    return (
      <>
        {label && <Typography className="report-item-label" variant="h6">{label}</Typography>}
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

  let xAlias = dimensionName || 'dimension_name';
  if (!data[0][xAlias] && data[0].col0) xAlias = 'col0';

  const formattersByName = {};
  metrics.forEach((f) => {
    formattersByName[f.alias] = (val) => formatValue(val, f.format);
    formattersByName[f.label] = (val) => formatValue(val, f.format);
  });

  let displayMetrics = metrics;
  const total = {};
  if (breakdown) {
    const distinctBreakdown = data.reduce((a, d) => {
      a[d[breakdown.alias]] = (a[d[breakdown.alias]] || 0) + 1; return a;
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
      newData[d[xAlias]] = newData[d[xAlias]] || {};// Create an object
      newData[d[xAlias]][xAlias] = d[xAlias]; // set the date
      const value = d[metrics[0].alias];
      if (validValueLookup && !validValueLookup[d[breakdown.alias]]) {
        total['(Other)'] = (total['(Other)'] || 0) + value;
        newData[d[xAlias]]['(Other)'] = (newData[d[xAlias]]['(Other)'] || 0) + value;
      } else {
        total[d[breakdown.alias]] = (total[d[breakdown.alias]] || 0) + value;
        newData[d[xAlias]][d[breakdown.alias]] = (newData[d[xAlias]][d[breakdown.alias]] || 0)
         + value;
      }
    });
    data = Object.values(newData);

    displayMetrics = [].concat(keyCount.map((d) => {
      formattersByName[d.key] = (val) => formatValue(val, metrics[0].format);
      return {
        alias: d.key, yAxis: breakdown.yAxis, type: 'bar', stackId: 'stackA',
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

  let xaxis = <XAxis dataKey={xAlias} tickFormatter={xFormat} />;
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
        dataKey={xAlias}
        domain={domain}
        scale="time"
        type="number"
        padding={{ left: leftPad, right: rightPad }}
        tickFormatter={xFormat}
      />
    );
  }

  if (breakdown) breakdown.alias = breakdown.alias || breakdown.label || '_breakdown';

  let rightAxis = null;
  if (metrics.find((d) => d.yaxis === 'right')) {
    const r1 = metrics.find((d) => d.yaxis === 'right');
    rightAxis = <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => formatValue(val, r1.format)} />;
  }
  // find the first left format
  const left1 = metrics.find((d) => d.yaxis !== 'right') || {};
  function yFormatLeft(val) { return formatValue(val, left1.format); }
  data = data.map((d) => {
    if (!isDate) return d;
    if (String(d[xAlias]).length === 4) {
      d[xAlias] = new Date(`${String(d[xAlias])}-01-01`).getTime(); // fix for year functions that don't return full date format
    } else {
      d[xAlias] = new Date(d[xAlias]).getTime();
    }
    if (domain && d[xAlias] < domain[0]) {
      return false;
    }
    if (domain && d[xAlias] > domain[1]) return false;
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
    data.sort((a, b) => (a[xAlias] < b[xAlias] ? -1 : 1));
  }
  const deltas = [];
  if (delta) {
    if (Array.isArray(delta)) {
      delta = { range: delta };
    }
    let includeSince = false;
    if (delta.includeSince) includeSince = true;

    if (Array.isArray(delta.range) && data.length > 1) {
      const [a, b] = delta.range;
      const x1 = a < 0 ? data.length + a : a;
      const x2 = b < 0 ? data.length + b : b;

      const value = data[x2][metrics[0].alias] - data[x1][metrics[0].alias];
      const percent = value / data[x1][metrics[0].alias];
      // const label = `Since ${formatValue(relativeDate(data[x1][xAlias]), 'date')}`;
      deltas.push(Delta({
        value, percent, format: metrics[0].format, label: includeSince ? label : '',
      }));
      if (data.length > 2) {
        const allValue = data[data.length - 1][metrics[0].alias] - data[0][metrics[0].alias];
        const allPercent = allValue / data[0][metrics[0].alias];
        let allLabel = '';
        if (qs.start) {
          allLabel = `Since ${formatValue(relativeDate(qs.start), 'date')}`;
          deltas.push(Delta({
            value: allValue, percent: allPercent, format: metrics[0].format, label: includeSince ? allLabel : '',
          }));
        }
      }
    } else {
      console.error('Invalid delta:', delta);
    }
  }

  return (
    <Row className="h-100 report-bar-chart">
      {label && <Col sm={12}><Typography className="report-item-label" variant="h6">{label}</Typography></Col>}
      <Col md={deltas.length ? 10 : 12} sm={12}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{
              top: 20, right: 10, bottom: 0, left: 25,
            }}
            onMouseDown={isDate ? (e) => { if (e) setLeft(e.activeLabel); } : null}
            onMouseMove={isDate ? (e) => e && refAreaLeft && setRight(e.activeLabel) : null}
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
            <YAxis yAxisId="left" tickFormatter={yFormatLeft} />
            {rightAxis}
            <Tooltip
              labelFormatter={(value) => (isDate ? formatValue(value, 'utcdate') : value)}
              formatter={
   (value, n) => {
     if (typeof formattersByName[n] === 'function') {
       return formattersByName[n](value);
     }
     // console.error("Could not find formatter "+n);
     return value;
   }
}
            />
            <Legend />
            {displayMetrics.map((f, i) => {
              const key = `key${i}`;
              const color = f.color || getColor(i, f.label || f.alias);
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
                case 'bar': return <Bar key={key} yAxisId={f.yaxis || 'left'} name={f.label} dataKey={f.alias} stackId={f.stackId || (stack ? 'stackA' : '') || null} fill={color} />;
                case 'area': return <Area key={key} yAxisId={f.yaxis || 'left'} type="linear" name={f.label} dataKey={f.alias} fill={color} stroke={color} />;
                default: return <Line type="monotone" dot={dot} connectNulls={false} key={key} name={f.label} yAxisId={f.yaxis || 'left'} dataKey={f.alias} stroke={color} filter="url(#lineShadow)" />;
              }
            })}
            {
                     (refAreaLeft && refAreaRight) ? (
                       <ReferenceArea yAxisId="left" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                  }
          </ComposedChart>
        </ResponsiveContainer>
      </Col>
      {deltas.length > 0 && (
      <Col style={{ alignSelf: 'center' }} md={2} sm={12}>
        {deltas}
      </Col>
      )}
    </Row>
  );
}
