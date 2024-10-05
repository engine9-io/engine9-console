import React, { useEffect, useState } from 'react';
import { Tabs, Flex } from 'antd';
import queryString from 'query-string';

import { useParams } from 'react-router-dom';

import AppsContainer from '@crema/components/AppsContainer';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { StyledMainContentView } from '@crema/components/AppContentView/index.styled';
// import SidebarContent from '@engine9/ui/components/SidebarContent';
import { useComponentArray } from './LayoutUtilities';

/*
  The tabbar layout very specifically has a left sidebar that controls the behavior
  of the main body, using hashes
*/

export default function TabbarLayout({ components }) {
  const parameters = useParams();
  const parsedHash = queryString.parse(window.location.hash.slice(1));
  const { tabPosition = 'left' } = components;
  let { header = [], tabs = [], defaultActiveKey } = components;

  if (!tabs) {
    return 'There is no required tabs component for the Sidebar layout';
  }

  if (!Array.isArray(tabs)) {
    tabs = Object.keys(tabs).map((key) => {
      if (!key) throw new Error('Invalid key');
      const obj = tabs[key];
      if (typeof obj !== 'object') {
        throw new Error(`Invalid key ${key} in tabs, should be an object`);
      }
      console.log({ key }, obj);
      return { ...obj, key };
    });
  }
  const items = tabs.map((t, i) => {
    if (i === 0) defaultActiveKey = t.key;
    return {
      label: t.label || t.key || '(no label)',
      key: t.key,
      children: useComponentArray(t.children, parameters),
    };
  });

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

  header = useComponentArray(header, parameters);

  return (
    <StyledMainContentView>
      {header.length > 0 && (
        <div className="e9-header">
          <Flex justify="space-between">
            {header}
          </Flex>
        </div>
      )}
      {/* <AppsContainer>
        <AppsContent> */}
      <div className="e9-layout-tabs">
        <Tabs
          tabPosition={tabPosition}
          defaultActiveKey={defaultActiveKey}
          items={items}
          activeKey={tab}
          onChange={onChange}
        />
      </div>
      {/* </AppsContent>
      </AppsContainer> */}
    </StyledMainContentView>
  );
}
