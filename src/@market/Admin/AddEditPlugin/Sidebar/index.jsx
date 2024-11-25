import React from 'react';
import AppCard from '@crema/components/AppCard';
import { productCategory } from '@crema/mockapi/fakedb/ecommerce/ecommerceData';
import { useNavigate } from 'react-router';
import AppRowContainer from '@crema/components/AppRowContainer';
import AppScrollbar from '@crema/components/AppScrollbar';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
} from 'antd';
import { useIntl } from 'react-intl';
import { StyledFormWrapper } from './index.styled';
import PropTypes from 'prop-types';

const TagList = [
  {
    value: 1,
    label: 'Fashion',
  },
  {
    value: 2,
    label: 'Hotel',
  },
  {
    value: 3,
    label: 'Event',
  },
];

const { Option } = Select;
const BlogSidebar = ({
  form,
  isEdit,
  productInfo,
  productSpec,
  setPluginSpec,
  setPluginInfo,
  selectedTags,
  setSelectedTags,
}) => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  return (
    <Col xs={24} lg={8}>
      <AppScrollbar style={{ height: '700px' }}>
        <StyledFormWrapper>
          <AppCard title='Plugin Details'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='mr-10 mb-20'>In Stock</span>
              <Form.Item name='inStock' valuePropName='checked'>
                <Switch
                  defaultChecked={form.getFieldValue('inStock')}
                  onChange={(checked) => form.setFieldValue('inStock', checked)}
                />
              </Form.Item>
            </div>

            <Form.Item label='Plugin SKU' name='SKU'>
              <Input placeholder='Plugin SKU' />
            </Form.Item>

            <Form.Item label={messages['common.category']} name='category'>
              <Select placeholder={messages['common.category']}>
                {productCategory.map((category) => {
                  return (
                    <Option value={category.id} key={category.id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label='Tags' name='tag'>
              <Select
                mode='multiple'
                allowClear
                placeholder='Tags'
                value={selectedTags}
                onChange={(value) => setSelectedTags(value)}
                options={TagList}
              />
            </Form.Item>
          </AppCard>

          <AppCard title='Plugin Pricing'>
            <Form.Item label='Regular Price' name='mrp'>
              <InputNumber placeholder='Regular Price' addonAfter='$' />
            </Form.Item>
            <Form.Item label='Sale Price' name='salemrp'>
              <InputNumber placeholder='Sale Price' addonAfter='$' />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='mr-10 mb-20'>Tax Inclusive</span>
              <Form.Item name='includeTax' valuePropName='checked'>
                <Switch />
              </Form.Item>
            </div>
            <Form.Item label='Discount %' name='discount'>
              <InputNumber placeholder='Discount %' />
            </Form.Item>
          </AppCard>

          <AppCard
            title='Plugin Specification'
            extra={
              <Button
                type='primary'
                onClick={() => {
                  setPluginSpec([
                    ...productSpec,
                    { id: productSpec.length + 1, title: '', desc: '' },
                  ]);
                }}
              >
                Add New
              </Button>
            }
          >
            <AppRowContainer>
              {productSpec.map((productItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col xs={24} sm={12}>
                      <Input
                        className='mb-20'
                        placeholder='Plugin Label'
                        value={productItem.title}
                        onChange={(event) => {
                          const { value } = event.target;
                          const newPluginSpec = [...productSpec];
                          newPluginSpec[index].title = value;
                          setPluginSpec(newPluginSpec);
                        }}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Input
                        className='mb-20'
                        placeholder='Plugin Value'
                        value={productItem.desc}
                        onChange={(event) => {
                          const { value } = event.target;
                          const newPluginSpec = [...productSpec];
                          newPluginSpec[index].desc = value;
                          setPluginSpec(newPluginSpec);
                        }}
                      />
                    </Col>
                  </React.Fragment>
                );
              })}
            </AppRowContainer>
          </AppCard>

          <AppCard
            title='Plugin Details'
            extra={
              <Button
                type='primary'
                onClick={() => {
                  setPluginInfo([
                    ...productInfo,
                    { id: productInfo.length + 1, title: '', desc: '' },
                  ]);
                }}
              >
                Add New
              </Button>
            }
          >
            <AppRowContainer>
              {productInfo.map((productItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col xs={24} sm={12}>
                      <Input
                        className='mb-20'
                        placeholder='Plugin Label'
                        value={productItem.title}
                        onChange={(event) => {
                          const { value } = event.target;
                          const newPluginInfo = [...productInfo];
                          newPluginInfo[index].title = value;
                          setPluginInfo(newPluginInfo);
                        }}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Input
                        className='mb-20'
                        placeholder='Plugin Value'
                        value={productItem.desc}
                        onChange={(event) => {
                          const { value } = event.target;
                          const newPluginInfo = [...productInfo];
                          newPluginInfo[index].desc = value;
                          setPluginInfo(newPluginInfo);
                        }}
                      />
                    </Col>
                  </React.Fragment>
                );
              })}
            </AppRowContainer>
          </AppCard>
        </StyledFormWrapper>
      </AppScrollbar>
      <Space
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
      >
        <Button
          style={{
            minWidth: 100,
          }}
          type='primary'
          onClick={() => navigate(-1)}
          ghost
        >
          Cancel
        </Button>

        <Button
          style={{
            display: 'block',
            minWidth: 100,
          }}
          type='primary'
          htmlType='submit'
        >
          {isEdit ? 'Edit' : 'Add'} Plugin
        </Button>
      </Space>
    </Col>
  );
};

export default BlogSidebar;

BlogSidebar.propTypes = {
  form: PropTypes.any,
  isEdit: PropTypes.bool,
  inStock: PropTypes.bool,
  productInfo: PropTypes.array,
  productSpec: PropTypes.array,
  setPluginSpec: PropTypes.func,
  setFieldValue: PropTypes.func,
  setPluginInfo: PropTypes.func,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func,
};
