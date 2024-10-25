import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Checkbox, Rate } from 'antd';
import {
  StyledPluginListAction,
  StyledPluginListActionItem,
  StyledPluginListCard,
  StyledPluginListCardContent,
  StyledPluginListContentPara,
  StyledPluginListFavorCheck,
  StyledPluginListPrice,
  StyledPluginListPriceItem,
  StyledPluginListPriceItemText,
  StyledPluginListPriceItemValue,
  StyledPluginListPriceItemValueCut,
  StyledPluginListSlider,
  StyledPluginListSliderContent,
  StyledPluginListSliderContentHeader,
  StyledPluginListSliderThumb,
} from './index.styled';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ListItem = (props) => {
  const { item } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const OnFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <StyledPluginListCard
      className='item-hover'
      onClick={() => {
        navigate('../plugins/' + item.id);
      }}
    >
      <StyledPluginListCardContent>
        <StyledPluginListSlider>
          <Slider className='slick-slider-global' {...settings}>
            {item.image.map((img) => {
              return (
                <StyledPluginListSliderThumb key={img.id}>
                  <img src={img.src} alt='watch' />
                </StyledPluginListSliderThumb>
              );
            })}
          </Slider>
        </StyledPluginListSlider>

        <StyledPluginListSliderContent>
          <StyledPluginListSliderContentHeader>
            <h3 className='text-truncate'>{item.title}</h3>

            <StyledPluginListFavorCheck onClick={OnFavorite}>
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </StyledPluginListFavorCheck>
          </StyledPluginListSliderContentHeader>

          <StyledPluginListContentPara>
            {item.description}
          </StyledPluginListContentPara>

          <StyledPluginListPrice>
            <StyledPluginListPriceItem>
              <StyledPluginListPriceItemText>
                <IntlMessages id='ecommerce.exclusivePrice' />:
              </StyledPluginListPriceItemText>
              <StyledPluginListPriceItemValue>
                ${+item.mrp - Math.round((+item.mrp * +item.discount) / 100)}
              </StyledPluginListPriceItemValue>
            </StyledPluginListPriceItem>
            <StyledPluginListPriceItem>
              <IntlMessages id='ecommerce.mrp' />:
              <StyledPluginListPriceItemValueCut>
                ${item.mrp}
              </StyledPluginListPriceItemValueCut>
            </StyledPluginListPriceItem>
            <StyledPluginListPriceItem className='green'>
              {item.discount}% <IntlMessages id='ecommerce.off' />
            </StyledPluginListPriceItem>
          </StyledPluginListPrice>

          <StyledPluginListAction>
            <StyledPluginListActionItem className='add-to-com'>
              <Checkbox />
              <span>
                <IntlMessages id='ecommerce.addToCompare' />
              </span>
            </StyledPluginListActionItem>
            <StyledPluginListActionItem>
              <Rate value={item.rating} />
              <span>{`(${item.reviews})`}</span>
            </StyledPluginListActionItem>
          </StyledPluginListAction>
        </StyledPluginListSliderContent>
      </StyledPluginListCardContent>
    </StyledPluginListCard>
  );
};

export default ListItem;

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
