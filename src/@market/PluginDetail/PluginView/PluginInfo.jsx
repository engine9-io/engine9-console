import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col } from 'antd';
import {
  StyledPluginDetailItemTitle,
  StyledPluginDetailSpecification,
} from './index.styled';
import PropTypes from 'prop-types';

const PluginInfo = ({ productInfo }) => {
  return (
    <StyledPluginDetailSpecification>
      <StyledPluginDetailItemTitle>
        Plugin Details
      </StyledPluginDetailItemTitle>
      <AppRowContainer>
        {productInfo.map((data, index) => (
          <React.Fragment key={index}>
            <Col xs={8}>
              <p className='text-secondary'>{data.title}</p>
            </Col>
            <Col xs={16}>
              <p> {data.desc}</p>
            </Col>
          </React.Fragment>
        ))}
      </AppRowContainer>
    </StyledPluginDetailSpecification>
  );
};

export default PluginInfo;

PluginInfo.propTypes = {
  productInfo: PropTypes.array,
};
