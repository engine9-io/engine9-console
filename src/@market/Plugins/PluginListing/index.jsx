import React, { useEffect, useState } from 'react';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import {
  StyledPluginListMainContent,
  StyledPluginListView,
} from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import PropTypes from 'prop-types';
import { VIEW_TYPE } from '../index';
import PluginHeader from '../PluginHeader';
import PluginGrid from './PluginGrid';
import PluginList from './PluginList';

const PluginListing = ({
  filterData,
  viewType,
  setViewType,
  setFilterData,
}) => {
  const [page, setPage] = useState(0);
  const [{ apiData: ecommerceList, loading }, { setQueryParams }] =
    useGetDataApi('/api/ecommerce/list', [], {}, false);
  const searchPlugin = (title) => {
    setFilterData({ ...filterData, title });
  };

  const onPageChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    setQueryParams({ filterData, page });
  }, [filterData]);

  return (
    <StyledPluginListView>
      <AppsHeader>
        <PluginHeader
          viewType={viewType}
          onChange={searchPlugin}
          setViewType={setViewType}
          onPageChange={onPageChange}
        />
      </AppsHeader>

      <AppsContent>
        <StyledPluginListMainContent>
          {viewType === VIEW_TYPE.GRID ? (
            <PluginGrid
              ecommerceList={ecommerceList?.list}
              loading={loading}
            />
          ) : (
            <PluginList
              ecommerceList={ecommerceList?.list}
              loading={loading}
            />
          )}
        </StyledPluginListMainContent>
      </AppsContent>
    </StyledPluginListView>
  );
};

export default PluginListing;

PluginListing.propTypes = {
  filterData: PropTypes.object,
  viewType: PropTypes.string,
  setViewType: PropTypes.func,
  setFilterData: PropTypes.func,
};
