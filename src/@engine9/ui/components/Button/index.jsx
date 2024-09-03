import React from 'react';
import { useActionFunction } from '@engine9/ui/components/Actions';
import { getIcon } from '@engine9/ui/Icons';
import { Button } from 'antd';

export default function ButtonComponent(props) {
  const {
    properties, parameters,
  } = props;

  const {
    onClick, type, icon, content,
  } = properties;

  const onClickAction = useActionFunction(onClick);

  return (
    <Button
      onClick={(event) => {
        onClickAction({ event, properties, parameters });
      }}
      type={type}
      icon={icon && getIcon(icon)}
    >
      {content}
    </Button>
  );
}
