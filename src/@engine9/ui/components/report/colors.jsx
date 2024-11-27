import React from 'react';

const colorMap = {
  themed: [
    'var(--theme-chart-1)',
    'var(--theme-chart-2)',
    'var(--theme-chart-3)',
    'var(--theme-chart-4)',
    'var(--theme-chart-5)',
    'var(--theme-chart-6)',
    'var(--theme-chart-7)',
    'var(--theme-chart-8)',
    'var(--theme-chart-9)',
    'var(--theme-chart-10)',
  ],
  core: [
    '#62b9e0', // blue
    '#819d4e', // green
    '#EE6352', // generated Orange
    '#59CD90', // generated light green
    '#FAC05E', // generated yellow
    '#37123C', // generated purple
    '#C8963E', // generated brown
    '#087F8C', // generated bluegreen
  ],
  core2: [
    '#1b1915', /* nero */
    '#0085a6', /* eastern blue */
    '#5c5a58', /* chicago */
    '#22cde9',
    '#638f0f',
    '#010101',
    '#828280', /* concord */
    '#000000',
  ],
  style1: [
    '#00b2f6',
    '#ffa300',
    '#994300',
    '#0088a1',
    '#ff9a00',
    '#66c7bb',
    '#061974',
    '#ffc866',
    '#8884d8',
    '#ff6f00',
  ],
  material: [
    '#0288D1',
    '#03A9F4',
    '#B3E5FC',
    '#FF5722',
    '#212121',
    '#757575',
    '#BDBDBD',
  ],
  dcMetroColors: [
    '#0795d3', // blue
    '#be1337', // red
    '#da8707', // orange
    '#f5d415', // yellow
    '#00b050', // green
    '#03A9F4',
    '#B3E5FC',
    '#FF5722',
    // "#a2a4a1",//silver"
    // "#212121", //Greys are reserved
    // "#757575",
  ],
  simple: [
    '#e6194b',
    '#3cb44b',
    '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000',
  ],
};

// Colors retrieved from https://www.materialui.co/socialcolors
const colorsByName = {
  Facebook: '#3b5999',
  FB: '#3b5999',
  LinkedIn: '#0077B5',
  LI: '#0077B5',
  Twitter: '#55acee',
  TW: '#55acee',
  WhatsApp: '#25D366',
  WA: '#25D366',
  Instagram: '#e4405f',
  IN: '#e4405f',
  Google: '#F4B400',
  GA: '#F4B400',
  GoogleAds: '#F4B400',
  Email: '#FF9800',
  EM: '#FF9800',
  Web: '#8E24AA',
  Website: '#8E24AA',
  WB: '#8E24AA',
  WEB: '#8E24AA',
  '': '#9E9E9E',
  Other: '#9E9E9E',
  '(Blank)': '#9E9E9E',
  'N/A': '#616161',
  democrat: '#0015BC',
  democrats: '#0015BC',
  liberal: '#929efe',
  liberals: '#929efe',
  left: '#929efe',
  republican: '#E9141D',
  republicans: '#E9141D',
  conservative: '#f8afb2',
  right: '#f8afb2',
};
Object.keys(colorsByName).forEach((f) => {
  colorsByName[f.toLowerCase()] = colorsByName[f];
});

export function getColorFunc(scheme, useFullName = false) {
  let schema = scheme;
  if (typeof scheme === 'string') schema = colorMap[scheme];
  return function getColor(i, name) {
    if (name !== undefined) { // could be blank
      let o = colorsByName[name.toLowerCase()];
      if (o) return o;
      const s = name.split('_');
      o = colorsByName[s[0].toLowerCase()];
      if (o && !useFullName) return o;
      o = schema[Object.keys(colorsByName).length % schema.length];
      colorsByName[name.toLowerCase()] = o;
      return o;
    }
    return schema[i % schema.length];
  };
}

export function useColorFunc() {
  return getColorFunc('themed');
}

export function Gradients() {
  return (
    <defs>
      {colorMap.core.map((s, i) => {
        const id = `gradient${i}`;
        return (
          <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={s.stroke} stopOpacity={0.8} />
            <stop offset="95%" stopColor={s.stroke} stopOpacity={0} />
          </linearGradient>
        );
      })}
    </defs>
  );
}
