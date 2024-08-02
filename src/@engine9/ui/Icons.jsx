import React from 'react';
import {
  FiUser, FiUsers, FiBarChart, FiHome, FiSearch,
} from 'react-icons/fi';
import { TbDatabase, TbDatabaseExport } from 'react-icons/tb';
import { LuForklift } from 'react-icons/lu';
import { useAccountId } from '@engine9/helpers/AccountHelper';

import {
  FaSms, FaRegPaperPlane, FaMailBulk, FaDollarSign,
  FaPlus, FaArrowLeft, FaRegEdit,
} from 'react-icons/fa';

// import { MdQuestionMark } from 'react-icons/md';

export function getIcon(name) {
  switch (name) {
    case 'home': return <FiHome />;
    case 'dashboard': return <FiHome />;
    case 'report': return <FiBarChart />;
    case 'back': return <FaArrowLeft />;
    case 'plus': return <FaPlus />;
    case 'person': return <FiUser />;
    case 'search': return <FiSearch />;
    case 'people': return <FiUsers />;
    case 'export': return <TbDatabaseExport />;
    case 'messages': return <FaRegEdit />;
    case 'forklift': return <LuForklift />;
    case 'campaign': return <FaMailBulk />;
    case 'data': return <TbDatabase />;
    case 'email': return <FaRegPaperPlane />;
    case 'sms': return <FaSms />;
    case 'transaction': return <FaDollarSign />;
    default: return `<${name}?>`;// <MdQuestionMark />;
  }
}

export function appendIcons(_config) {
  const accountId = useAccountId();
  if (typeof _config !== 'object') return _config;
  const config = JSON.parse(JSON.stringify(_config));
  if (Array.isArray(config)) {
    return config.map((d) => appendIcons(d));
  }
  if (typeof config.icon === 'string') {
    config.icon = getIcon(config.icon);
  }
  if (config.url && config.url.indexOf('/') === 0) config.url = `/${accountId}${config.url}`;

  if (Array.isArray(config.children)) {
    config.children = appendIcons(config.children);
  }
  return config;
}
export default appendIcons;
