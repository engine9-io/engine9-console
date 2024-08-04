import React from 'react';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { getIcon } from '@engine9/ui/Icons';
import { Typography } from 'antd';

const { Title } = Typography;

export default function TitleComponent(props) {
  const {
    properties,
  } = props;

  const {
    onClick, icon, content = '(No content property)',
  } = properties;

  const onClickAction = useActionFunction(onClick);

  return (
    <Title
      onClick={onClickAction}
      icon={icon && getIcon(icon)}
    >
      {content}
    </Title>
  );
}
