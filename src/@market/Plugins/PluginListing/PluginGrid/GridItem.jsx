import React, { useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { HeartFilled, HeartOutlined, StarOutlined } from '@ant-design/icons';
import {
  StyledPluginGridAction,
  StyledPluginGridActionItem,
  StyledPluginGridCard,
  StyledPluginGridCardHeader,
  StyledPluginGridCardHeaderBadge,
  StyledPluginGridCardHeaderThumb,
  StyledPluginGridCardPara,
  StyledPluginGridCardTitle,
  StyledPluginListFavorCheck,
} from './index.styled';

function GridItem(props) {
  const { item } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const OnFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <StyledPluginGridCard
      className="item-hover"
      onClick={() => {
        navigate(`../plugins/${item.id}`);
      }}
    >
      <StyledPluginGridCardHeader>
        <StyledPluginGridCardHeaderBadge>
          {item.rating}
          <StarOutlined />
        </StyledPluginGridCardHeaderBadge>

        <StyledPluginGridCardHeaderThumb>
          <img src={item.image[0].src} alt="watch" />
        </StyledPluginGridCardHeaderThumb>

        <StyledPluginListFavorCheck onClick={OnFavorite}>
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </StyledPluginListFavorCheck>
      </StyledPluginGridCardHeader>

      <StyledPluginGridCardTitle className="text-truncate">
        {item.title}
      </StyledPluginGridCardTitle>

      <StyledPluginGridCardPara className="text-truncate">
        {item.description}
      </StyledPluginGridCardPara>

      <StyledPluginGridAction>
        <StyledPluginGridActionItem>
          $
          {' '}
          {+item.mrp - Math.round((+item.mrp * +item.discount) / 100)}
        </StyledPluginGridActionItem>
        <StyledPluginGridActionItem className="cut">
          $
          {item.mrp}
        </StyledPluginGridActionItem>
        <StyledPluginGridActionItem className="green">
          {item.discount}
          %
          <IntlMessages id="ecommerce.off" />
        </StyledPluginGridActionItem>
      </StyledPluginGridAction>
    </StyledPluginGridCard>
  );
}

export default GridItem;

GridItem.propTypes = {
  item: PropTypes.object.isRequired,
};
