import React from 'react';
import PluginSpecification from './PluginSpecification';
import PluginInfo from './PluginInfo';
import DeliveryInfo from './DeliveryInfo';
import Reviews from './Reviews';
import AvailableOffers from './AvailableOffers';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import {
  StyledPluginView,
  StyledPluginViewTitle,
  StyledStrokeSubtitle,
} from './index.styled';

const PluginView = ({ product }) => {
  return (
    <StyledPluginView>
      <StyledPluginViewTitle>
        ${product.mrp}
        <span className='line-through'>
          ${+product.mrp - +product.discount}
        </span>
      </StyledPluginViewTitle>
      <StyledStrokeSubtitle>In stock</StyledStrokeSubtitle>
      <p className='text-secondary mb-0'>
        {product.description || 'No description found'}
      </p>
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <AvailableOffers />
      <DeliveryInfo />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <PluginSpecification productSpec={product.productSpec || []} />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <PluginInfo productInfo={product.productInfo || []} />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <Reviews />
    </StyledPluginView>
  );
};

export default PluginView;

PluginView.propTypes = {
  product: PropTypes.object,
};
