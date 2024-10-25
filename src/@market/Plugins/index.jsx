import React from 'react';
import PluginListing from './PluginListing';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';

import AppPageMeta from '@crema/components/AppPageMeta';
import PluginSidebar from './PluginSidebar';

export const VIEW_TYPE = {
  GRID: 'grid',
  LIST: 'list',
};

const Plugins = () => {
  const { messages } = useIntl();
  const [filterData, setFilterData] = React.useState({
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  });
  const [viewType, setViewType] = React.useState(VIEW_TYPE.GRID);
  return (
    <AppsContainer
      sidebarContent={
        <PluginSidebar
          filterData={filterData}
          setFilterData={setFilterData}
        />
      }
    >
      <AppPageMeta title='Engine9 Marketplace' />
      <PluginListing
        filterData={filterData}
        viewType={viewType}
        setViewType={setViewType}
        setFilterData={setFilterData}
      />
    </AppsContainer>
  );
};

export default Plugins;
