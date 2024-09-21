import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import queryString from 'query-string';

export default function TabComponent(props) {
  const { items, tabPosition, defaultActiveKey } = props;
  const parsedHash = queryString.parse(window.location.hash.slice(1));

  const [tab, setTab] = useState(parsedHash?.tab || items[0].key);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const p = queryString.parse(window.location.hash.slice(1));
      setTab(p.tab);
    });
  }, []);

  const onChange = (key) => {
    setTab(key);
  };

  useEffect(() => {
    if (tab) {
      const p = queryString.parse(window.location.hash.slice(1));
      p.tab = tab;
      window.location.hash = queryString.stringify(p);
    }
  }, [tab]);

  return (
    <Tabs
      tabPosition={tabPosition}
      defaultActiveKey={defaultActiveKey}
      items={items}
      activeKey={tab}
      onChange={onChange}
    />
  );
}
