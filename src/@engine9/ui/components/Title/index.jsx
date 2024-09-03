import React from 'react';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { getIcon } from '@engine9/ui/Icons';
import { Typography } from 'antd';
import './index.css';

const { Title } = Typography;

export default function TitleComponent(props) {
  const {
    properties,
  } = props;

  const {
    onClick, icon, content = '(No content property)',
    level = 3,
  } = properties;

  const onClickAction = useActionFunction(onClick);

  return (
    <Title
      onClick={onClickAction}
      icon={icon && getIcon(icon)}
      level={level}
    >
      {content}
    </Title>
  );
}
