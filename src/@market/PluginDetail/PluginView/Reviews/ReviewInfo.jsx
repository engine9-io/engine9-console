import React from 'react';
import AppCircularProgress from '@crema/components/AppCircularProgress';
import { StarFilled } from '@ant-design/icons';
import { Progress } from 'antd';
import {
  StyledPluginDetailReviewCirProgressInside,
  StyledPluginDetailReviewCirProgressView,
  StyledPluginDetailReviewContent,
  StyledPluginDetailReviewInfo,
  StyledPluginDetailReviewitem,
  StyledPluginDetailReviewResult,
} from '../index.styled';

const ReviewInfo = () => {
  return (
    <StyledPluginDetailReviewInfo>
      <StyledPluginDetailReviewCirProgressView>
        <AppCircularProgress
          className='appCircularProgress'
          trailColor='#d6d6d6'
          strokeColor='#49BD65'
          percent={70}
          size={150}
          format={() => (
            <StyledPluginDetailReviewCirProgressInside>
              <h3>
                4.8 <StarFilled />
              </h3>
              <p>Overall rating</p>
            </StyledPluginDetailReviewCirProgressInside>
          )}
        />
      </StyledPluginDetailReviewCirProgressView>
      <StyledPluginDetailReviewContent>
        <StyledPluginDetailReviewitem>
          <span>5</span>
          <StarFilled />
          <Progress
            trailColor='#d6d6d6'
            strokeColor='#49BD65'
            percent={70}
            showInfo={false}
            style={{ minWidth: 200, maxWidth: 500 }}
          />
          <StyledPluginDetailReviewResult>432</StyledPluginDetailReviewResult>
        </StyledPluginDetailReviewitem>
        <StyledPluginDetailReviewitem>
          <span>4</span>
          <StarFilled />
          <Progress
            trailColor='#d6d6d6'
            strokeColor='#49BD65'
            percent={30}
            showInfo={false}
            style={{ minWidth: 200, maxWidth: 500 }}
          />
          <StyledPluginDetailReviewResult>122</StyledPluginDetailReviewResult>
        </StyledPluginDetailReviewitem>
        <StyledPluginDetailReviewitem>
          <span>3</span>
          <StarFilled />
          <Progress
            trailColor='#d6d6d6'
            strokeColor='#FF9F00'
            percent={20}
            showInfo={false}
            style={{ minWidth: 200, maxWidth: 500 }}
          />
          <StyledPluginDetailReviewResult>20</StyledPluginDetailReviewResult>
        </StyledPluginDetailReviewitem>
        <StyledPluginDetailReviewitem>
          <span>2</span>
          <StarFilled />
          <Progress
            trailColor='#d6d6d6'
            strokeColor='#FF9F00'
            percent={30}
            showInfo={false}
            style={{ minWidth: 200, maxWidth: 500 }}
          />
          <StyledPluginDetailReviewResult>3</StyledPluginDetailReviewResult>
        </StyledPluginDetailReviewitem>
        <StyledPluginDetailReviewitem>
          <span>1</span>
          <StarFilled />
          <Progress
            trailColor='#d6d6d6'
            strokeColor='#FF6161'
            percent={40}
            showInfo={false}
            style={{ minWidth: 200, maxWidth: 500 }}
          />
          <StyledPluginDetailReviewResult>4</StyledPluginDetailReviewResult>
        </StyledPluginDetailReviewitem>
      </StyledPluginDetailReviewContent>
    </StyledPluginDetailReviewInfo>
  );
};

export default ReviewInfo;
