/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRowContainer from '@crema/components/AppRowContainer';
import AppAnimate from '@crema/components/AppAnimate';
import { Col } from 'antd';
import AppLoader from '@crema/components/AppLoader';
import {
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'


export default function FullWidth() {
  return (
    <QueryClientProvider client={queryClient}>    
      <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AppRowContainer delay={150}>
        <Col xs={24} lg={16} key={'a'}>
          This is full width
        </Col>
      </AppRowContainer>
    </AppAnimate>
    </QueryClientProvider>
  )
}

