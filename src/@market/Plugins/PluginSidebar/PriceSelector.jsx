import React from 'react';
import { Slider } from 'antd';
import { StyledPluginSidebarPriceSelector } from './index.styled';

const PriceSelector = () => {
  const [value, setValue] = React.useState([50, 400]);

  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <>
      <Slider range defaultValue={value} onChange={handleChange} />

      <StyledPluginSidebarPriceSelector>
        <span>$ {value[0]}</span>
        <span>$ {value[1]}</span>
      </StyledPluginSidebarPriceSelector>
    </>
  );
};

export default PriceSelector;
