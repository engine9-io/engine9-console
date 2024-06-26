import React from 'react';
import PropTypes from 'prop-types';
import AppLogo from '@crema/components/AppLayout/components/AppLogo';
import AppAnimateGroup from '@crema/components/AppAnimateGroup';
import AppInfoView from '@crema/components/AppInfoView';
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
  StyledMainAuthScrollbar,
} from './AuthWrapper.styled';

function AuthWrapper({ children }) {
  return (
    <StyledAuth>
      <StyledMainAuthScrollbar>
        <AppAnimateGroup
          type="scale"
          animateStyle={{ flex: 1 }}
          delay={0}
          style={{ height: '100%' }}
          interval={10}
          duration={200}
        >
          <StyledAuthWrap key="wrap">
            <StyledAuthCard>
              <StyledAuthMainContent>
                <StyledAuthCardHeader>
                  <AppLogo />
                </StyledAuthCardHeader>
                {children}
              </StyledAuthMainContent>
              <StyledAuthWellAction>
                <StyledAuthWelContent>
                  <h2>Welcome to Engine9!</h2>
                  <p>
                    Enterprise, Open Source CRM and CDP
                  </p>
                </StyledAuthWelContent>
              </StyledAuthWellAction>
            </StyledAuthCard>
          </StyledAuthWrap>
          <AppInfoView />
        </AppAnimateGroup>
      </StyledMainAuthScrollbar>
    </StyledAuth>
  );
}

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
