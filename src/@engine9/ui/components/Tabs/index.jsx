import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';

export default function TabComponent(props) {
  const { items, tabPosition, defaultActiveKey } = props;
  const [tab, setTab] = useState(window.location.hash.slice(1));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      setTab(hash);
    });
  }, []);

  const onChange = (key) => {
    setTab(key);
  };

  useEffect(() => {
    if (tab) window.location.hash = tab;
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
