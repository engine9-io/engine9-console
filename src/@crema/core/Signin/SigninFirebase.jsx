import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Form, Input } from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { FaFacebookF } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignedText,
  StyledSignFooter,
  StyledSignForm,
  StyledSignIconBtn,
  StyledSignLink,
  StyledSignLinkTag,
  StyledSignSocialLink,
  StyledSignTextGrey,
} from './index.styled';

const SignInFirebase = () => {
  const navigate = useNavigate();
  const { logInWithEmailAndPassword, logInWithPopup } = useAuthMethod();
  const { messages } = useIntl();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'firebase' });
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <StyledSign>
      <StyledSignFooter>
        <StyledSignedText>
          <IntlMessages id='common.orLoginWith' />
        </StyledSignedText>
        <StyledSignSocialLink>
          <StyledSignIconBtn
            aria-label='google'
            onClick={() => logInWithPopup('google')}
            icon={<GoogleOutlined />}
          />
        </StyledSignSocialLink>
      </StyledSignFooter>
    </StyledSign>
  );
};

export default SignInFirebase;
