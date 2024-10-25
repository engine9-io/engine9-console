import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined } from '@ant-design/icons';
import {
  StyledPluginSidebarColorCell,
  StyledPluginSidebarColorCellBtn,
} from './index.styled';

const ColorCell = ({ selected, data, onChange }) => {
  return (
    <StyledPluginSidebarColorCell
      onClick={() => onChange(data)}
      style={{
        backgroundColor: data,
      }}
    >
      {selected.some((item) => item === data) ? (
        <StyledPluginSidebarColorCellBtn>
          <CheckOutlined />
        </StyledPluginSidebarColorCellBtn>
      ) : null}
    </StyledPluginSidebarColorCell>
  );
};

export default ColorCell;

ColorCell.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.any,
  onChange: PropTypes.func,
};
