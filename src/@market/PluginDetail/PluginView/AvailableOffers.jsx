import React from 'react';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';
import {
  StyledAvailableOfferItemIcon,
  StyledAvailableOfferItemInner,
  StyledAvailableOfferPara,
  StyledPluginDetailAvailableOffer,
  StyledPluginDetailAvailableOfferItem,
  StyledPluginDetailItemTitle,
} from './index.styled';

const AvailableOffers = () => {
  return (
    <StyledPluginDetailAvailableOffer>
      <StyledPluginDetailItemTitle>
        Available offers
      </StyledPluginDetailItemTitle>

      <StyledPluginDetailAvailableOfferItem>
        <StyledAvailableOfferItemIcon>
          <TagOutlined style={{ fontSize: 16 }} />
        </StyledAvailableOfferItemIcon>
        <StyledAvailableOfferItemInner>
          <StyledAvailableOfferPara>
            Special PriceGet extra ₹598 off (price inclusive of discount)
          </StyledAvailableOfferPara>
          <span>T&C</span>
        </StyledAvailableOfferItemInner>
      </StyledPluginDetailAvailableOfferItem>

      <StyledPluginDetailAvailableOfferItem>
        <StyledAvailableOfferItemIcon>
          <CalendarOutlined style={{ fontSize: 16 }} />
        </StyledAvailableOfferItemIcon>
        <StyledAvailableOfferItemInner>
          <StyledAvailableOfferPara>
            No cost EMI ₹1,368/month. Standard EMI also available
          </StyledAvailableOfferPara>
          <span>View Plans</span>
        </StyledAvailableOfferItemInner>
      </StyledPluginDetailAvailableOfferItem>
    </StyledPluginDetailAvailableOffer>
  );
};

export default AvailableOffers;
