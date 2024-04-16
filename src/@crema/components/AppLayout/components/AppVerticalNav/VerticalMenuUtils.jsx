import { Link } from 'react-router-dom';
import React from 'react';
import { useIntl } from 'react-intl';
import { allowMultiLanguage } from '@crema/constants/AppConst';
import { MdQuestionMark } from 'react-icons/md';

const MenuItemChildren = (item) => {
  const { icon, url } = item;
  const { messages } = useIntl();
  let messageId=item.messageId || item.title.toLowerCase().replace(/[^a-z0-9_-]/g,"-");
  let title=(allowMultiLanguage ? messages[messageId] : item.title) || item.title;
  let isValid=React.isValidElement(icon);
  let validIcon=null;
  if (icon){
    if (React.isValidElement(icon)){
      validIcon=<span id={url} className='ant-menu-item-icon'>{icon}</span>;
    }else{
      validIcon=<icon id={url} className='ant-menu-item-icon'/>;
    }
  }
  
  if (url && url.includes('/')){
    return {
      key: item.id,
      icon:validIcon,
      label: (
        <Link to={url} id={url}>
          <span data-testid={messageId.toLowerCase() + '-nav'}>
            {title}
          </span>
        </Link>
      ),
    };
  }else {
    return {
      key: item.id,
      icon:validIcon,
      label: (
        <span id={url} data-testid={messageId.toLowerCase() + '-nav'}>
          {title}
        </span>
      ),
    };
  }
};

const renderMenuItem = (item) => {
  return item.type === 'collapse'
    ? {
        key: item.id,
        ...MenuItemChildren(item),
        children: item.children.map((item) => renderMenuItem(item)),
        type: 'collapse',
      }
    : {
        key: item.id,
        ...MenuItemChildren(item),
      };
};

const renderMenu = (item) => {
  return item.type === 'group'
    ? {
        key: item.url ? item.url : item.id,
        id: item.url || item.id,
        ...MenuItemChildren(item),
        children: item.children.map((item) => renderMenuItem(item)),
        type: 'group',
      }
    : {
        key: item.id,
        id: item.url || item.id,
        exact: item.exact,
        ...MenuItemChildren(item),
      };
};

export const getRouteMenus = (routesConfig) => {
  return routesConfig.map((route) => renderMenu(route));
};
