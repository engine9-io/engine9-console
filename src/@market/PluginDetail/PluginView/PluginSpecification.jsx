import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col } from 'antd';
import {
  StyledPluginDetailItemTitle,
  StyledPluginDetailSpecification,
} from './index.styled';
import PropTypes from 'prop-types';

const PluginSpecification = ({ productSpec }) => {
  return (
    <StyledPluginDetailSpecification>
      <StyledPluginDetailItemTitle>Specification</StyledPluginDetailItemTitle>
      <AppRowContainer>
        {productSpec.map((data, index) => (
          <React.Fragment key={index}>
            <Col xs={8}>
              <p className='text-secondary'> {data.title}</p>
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

export default PluginSpecification;

PluginSpecification.propTypes = {
  productSpec: PropTypes.array,
};
