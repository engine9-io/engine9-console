import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';
import Categories from './Categories';
import VisitorGraph from './VisitorGraph';
import { StyledEarningGraphWrapper } from './index.styled';

export function TotalVisitor({ totalVisitors }) {
  const { messages } = useIntl();

  return (
    <AppCard
      title={messages['dashboard.crm.totalVisitor']}
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      extra={<a href="#">{messages['common.viewAll']}</a>}
    >
      <StyledEarningGraphWrapper>
        <div className="earning-item earning-graph-item">
          <VisitorGraph totalVisitors={totalVisitors} />
        </div>
        <div className="earning-item">
          <List>
            {totalVisitors.map((category) => {
              if (category.name !== '') {
                return <Categories category={category} key={category.name} />;
              }
              return null;
            })}
          </List>
        </div>
      </StyledEarningGraphWrapper>
    </AppCard>
  );
}

export default TotalVisitor;

TotalVisitor.defaultProps = {
  totalVisitors: [],
};

TotalVisitor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  totalVisitors: PropTypes.array,
};
