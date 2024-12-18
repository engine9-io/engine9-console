import React, { useEffect, useState } from 'react';
import PluginCategory from './PluginCategory';
import PriceSelector from './PriceSelector';
import AppList from '@crema/components/AppList';
import CheckedCell from './CheckedCell';
import PropTypes from 'prop-types';
import RatingCell from './RatingCell';
import AppScrollbar from '@crema/components/AppScrollbar';
import AppGrid from '@crema/components/AppGrid';
import ColorCell from './ColorCell';
import {
  StyledPluginSidebar,
  StyledPluginSidebarItem,
  StyledPluginSidebarItemTitle,
  StyledPluginSidebarTitle,
} from './index.styled';
import {
  brandData,
  discountList,
  idealFor,
  PluginColors,
} from '@crema/mockapi/fakedb';

const PluginSidebar = ({ filterData, setFilterData }) => {
  const [selectedBrand, setSelectedBrand] = useState(filterData.brand);
  const [selectedFor, setSelectedFor] = useState(filterData.ideaFor);
  const [selectedDiscount, setSelectedDiscount] = useState(filterData.discount);
  const [selectedColor, setSelectedColor] = useState(filterData.color);
  const [customerRating, setCustomerRating] = useState(filterData.rating);

  useEffect(() => {
    setFilterData({
      title: filterData.title,
      brand: selectedBrand,
      ideaFor: selectedFor,
      discount: selectedDiscount,
      color: selectedColor,
      rating: customerRating,
    });
  }, [
    filterData.title,
    selectedBrand,
    selectedFor,
    selectedDiscount,
    selectedColor,
    customerRating,
  ]);

  const onSelectBrand = (brandId) => {
    if (selectedBrand.some((brand) => brand === brandId)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== brandId));
    } else {
      setSelectedBrand(selectedBrand.concat(brandId));
    }
  };

  const onSelectFor = (id) => {
    if (selectedFor.some((item) => item === id)) {
      setSelectedFor(selectedFor.filter((item) => item !== id));
    } else {
      setSelectedFor(selectedFor.concat(id));
    }
  };

  const onSelectDiscount = (id) => {
    if (selectedDiscount.some((item) => item === id)) {
      setSelectedDiscount(selectedDiscount.filter((item) => item !== id));
    } else {
      setSelectedDiscount(selectedDiscount.concat(id));
    }
  };

  const onSelectColor = (id) => {
    if (selectedColor.some((item) => item === id)) {
      setSelectedColor(selectedColor.filter((item) => item !== id));
    } else {
      setSelectedColor(selectedColor.concat(id));
    }
  };

  const onSelectRating = (id) => {
    if (customerRating.some((item) => item === id)) {
      setCustomerRating(customerRating.filter((item) => item !== id));
    } else {
      setCustomerRating(customerRating.concat(id));
    }
  };

  return (
    <AppScrollbar>
      <StyledPluginSidebar>
        <StyledPluginSidebarTitle>Filter By</StyledPluginSidebarTitle>

        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>
            Categories
          </StyledPluginSidebarItemTitle>
          <PluginCategory />
        </StyledPluginSidebarItem>
        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>Price</StyledPluginSidebarItemTitle>
          <PriceSelector />
        </StyledPluginSidebarItem>
        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>Brand</StyledPluginSidebarItemTitle>
          <AppList
            data={brandData}
            renderItem={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectBrand}
                selected={selectedBrand}
              />
            )}
          />
        </StyledPluginSidebarItem>
        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>
            Ideal For
          </StyledPluginSidebarItemTitle>
          <AppList
            data={idealFor}
            renderItem={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectFor}
                selected={selectedFor}
              />
            )}
          />
        </StyledPluginSidebarItem>

        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>
            Discount
          </StyledPluginSidebarItemTitle>
          <AppList
            data={discountList}
            renderItem={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectDiscount}
                selected={selectedDiscount}
              />
            )}
          />
        </StyledPluginSidebarItem>

        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>Color</StyledPluginSidebarItemTitle>
          <AppGrid
            data={Object.values(PluginColors)}
            responsive={{
              xs: 5,
              sm: 5,
              md: 5,
              lg: 5,
              xl: 5,
              xxl: 5,
            }}
            itemPadding={1}
            renderItem={(data, index) => (
              <ColorCell
                key={'color-' + index}
                data={data}
                selected={selectedColor}
                onChange={onSelectColor}
              />
            )}
          />
        </StyledPluginSidebarItem>

        <StyledPluginSidebarItem>
          <StyledPluginSidebarItemTitle>
            Customer Ratings
          </StyledPluginSidebarItemTitle>
          <AppList
            data={[5, 4, 3, 2, 1]}
            renderItem={(data) => (
              <RatingCell
                key={data}
                data={data}
                onChange={onSelectRating}
                selected={customerRating}
              />
            )}
          />
        </StyledPluginSidebarItem>
      </StyledPluginSidebar>
    </AppScrollbar>
  );
};

export default PluginSidebar;
PluginSidebar.propTypes = {
  filterData: PropTypes.object.isRequired,
  setFilterData: PropTypes.func.isRequired,
};
