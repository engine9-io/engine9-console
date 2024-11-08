import React from 'react';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import {
  StyledPluginHeader,
  StyledPluginHeaderBtn,
  StyledPluginHeaderLeft,
  StyledPluginHeaderRight,
  StyledPluginHeaderSearch,
  StyledPluginHeaderShowingText,
} from './index.styled';
import { VIEW_TYPE } from '../constants';

function PluginHeader({ onChange, viewType, setViewType }) {
  return (
    <StyledPluginHeader>
      <StyledPluginHeaderLeft>
        <h3>Engine9 Marketplace</h3>
        <StyledPluginHeaderShowingText className="text-truncate">
          (Showing 1 – 40 plugins of 93,723 plugins)
        </StyledPluginHeaderShowingText>
      </StyledPluginHeaderLeft>
      <StyledPluginHeaderRight>
        <StyledPluginHeaderSearch
          placeholder="Search here"
          onChange={(e) => onChange(e.target.value)}
        />

        <StyledPluginHeaderBtn
          className={clsx({
            active: viewType === VIEW_TYPE.LIST,
          })}
          onClick={() => setViewType(VIEW_TYPE.LIST)}
        >
          <UnorderedListOutlined />
        </StyledPluginHeaderBtn>
        <StyledPluginHeaderBtn
          className={clsx({
            active: viewType === VIEW_TYPE.GRID,
          })}
          onClick={() => setViewType(VIEW_TYPE.GRID)}
        >
          <AppstoreOutlined />
        </StyledPluginHeaderBtn>
      </StyledPluginHeaderRight>
    </StyledPluginHeader>
  );
}

export default PluginHeader;
