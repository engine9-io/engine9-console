import React from 'react';
import { Button } from 'antd';
import { DislikeOutlined, LikeOutlined, StarFilled } from '@ant-design/icons';
import {
  StyledPluginDetailCellAction,
  StyledPluginDetailCellAvatar,
  StyledPluginDetailCellTime,
  StyledPluginDetailReviewCell,
  StyledPluginDetailReviewCellBadge,
  StyledPluginDetailReviewCellContent,
  StyledPluginDetailReviewCellInfo,
} from '../index.styled';

const ReviewCell = () => {
  return (
    <StyledPluginDetailReviewCell className='item-hover'>
      <StyledPluginDetailReviewCellInfo>
        <StyledPluginDetailCellAvatar
          alt='user image'
          src={'/assets/images/avatar/A1.jpg'}
        />

        <StyledPluginDetailReviewCellContent>
          <h3>
            <StyledPluginDetailReviewCellBadge>
              5 <StarFilled />
            </StyledPluginDetailReviewCellBadge>
            Parmar Ravikumar
          </h3>
          <p>
            If several languages coalesce, the grammar of the resulting language
          </p>
          <StyledPluginDetailCellTime>5 hrs ago</StyledPluginDetailCellTime>
        </StyledPluginDetailReviewCellContent>
      </StyledPluginDetailReviewCellInfo>
      <StyledPluginDetailCellAction>
        <Button type='text'>
          <LikeOutlined style={{ fontSize: 16 }} />
        </Button>
        345
        <Button type='text'>
          <DislikeOutlined style={{ fontSize: 16 }} />
        </Button>
        13
      </StyledPluginDetailCellAction>
    </StyledPluginDetailReviewCell>
  );
};
export default ReviewCell;
