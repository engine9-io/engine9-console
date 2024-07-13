import React from 'react';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { getIcon } from '@engine9/ui/Icons';
import { Button } from 'antd';

export default function ButtonComponent(props) {
  const {
    properties,
  } = props;

  const {
    onClick, type, icon, content,
  } = properties;

  let onClickAction = () => {};
  if (onClick) {
    onClickAction = useActionFunction(onClick);
  }
  return (
    <Button
      onClick={onClickAction}
      type={type}
      icon={icon && getIcon(icon)}
    >
      {content}
    </Button>
  );
}
