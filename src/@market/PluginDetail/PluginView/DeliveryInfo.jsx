import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Tooltip } from 'antd';
import {
  DollarOutlined,
  InfoCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  StyledDeliveryInput,
  StyledPluginDeliveryInfoPara,
  StyledPluginDetailItemTitle,
  StyledPluginDetailService,
  StyledPluginDetailServicePara,
} from './index.styled';

const DeliveryInfo = () => {
  return (
    <AppRowContainer>
      <Col xs={24} sm={12}>
        <StyledPluginDetailItemTitle>Deliver to</StyledPluginDetailItemTitle>
        <StyledDeliveryInput id='delivery-pin-code' placeholder='Pin Code' />

        <StyledPluginDeliveryInfoPara>
          Delivery in 5-7 days | <span className='text-green'>Free</span>
          <span className='text-secondary'>$40</span>
        </StyledPluginDeliveryInfoPara>
        <p className='mb-0'>If ordered before 2:05 AM </p>
      </Col>

      <Col xs={24} sm={12}>
        <StyledPluginDetailItemTitle>Services</StyledPluginDetailItemTitle>

        <StyledPluginDetailService>
          <Tooltip title='Return policy'>
            <SyncOutlined style={{ color: '#0A8FDC', fontSize: 14 }} />
          </Tooltip>
          <StyledPluginDetailServicePara>
            30 Day Return Policy
            <Tooltip title='info'>
              <InfoCircleOutlined
                style={{ color: '#A0A5B9', fontSize: 14, marginLeft: 12 }}
              />
            </Tooltip>
          </StyledPluginDetailServicePara>
        </StyledPluginDetailService>

        <StyledPluginDetailService>
          <Tooltip title='COD Available'>
            <DollarOutlined style={{ color: '#0A8FDC', fontSize: 14 }} />
          </Tooltip>
          <StyledPluginDetailServicePara>
            Cash on Delivery available{' '}
            <Tooltip title='info'>
              <InfoCircleOutlined
                style={{ color: '#A0A5B9', fontSize: 14, marginLeft: 12 }}
              />
            </Tooltip>
          </StyledPluginDetailServicePara>
        </StyledPluginDetailService>
      </Col>
    </AppRowContainer>
  );
};

export default DeliveryInfo;
