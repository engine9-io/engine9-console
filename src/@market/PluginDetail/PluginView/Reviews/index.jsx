import React from 'react';
import AppList from '@crema/components/AppList';
import ReviewCell from './ReviewCell';
import { Divider } from 'antd';
import ReviewInfo from './ReviewInfo';
import { StyledPluginDetailItemTitle } from '../index.styled';

const Review = () => {
  return (
    <div>
      <StyledPluginDetailItemTitle>Reviews</StyledPluginDetailItemTitle>
      <ReviewInfo />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <AppList
        data={[1, 2, 3, 4, 5]}
        renderItem={(data) => <ReviewCell key={data} />}
      />
    </div>
  );
};

export default Review;
