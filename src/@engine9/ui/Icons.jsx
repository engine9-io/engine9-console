import React from 'react';
import {
  FiUser, FiUsers, FiBarChart, FiHome,
} from 'react-icons/fi';
import { TbDatabaseExport } from 'react-icons/tb';
import {
  FaSms, FaRegPaperPlane, FaMailBulk, FaDollarSign,
} from 'react-icons/fa';

import { MdQuestionMark } from 'react-icons/md';

function getIcon(name) {
  switch (name) {
    case 'home': return <FiHome />;
    case 'report': return <FiBarChart />;
    case 'person': return <FiUser />;
    case 'segment': return <FiUsers />;
    case 'export': return <TbDatabaseExport />;
    case 'campaign': return <FaMailBulk />;
    case 'email': return <FaRegPaperPlane />;
    case 'sms': return <FaSms />;
    case 'transaction': return <FaDollarSign />;
    default: return <MdQuestionMark />;
  }
}

export function appendIcons(_config) {
  if (typeof _config !== 'object') return _config;
  const config = JSON.parse(JSON.stringify(_config));
  if (Array.isArray(config)) {
    return config.map((d) => appendIcons(d));
  }
  if (typeof config.icon === 'string') {
    config.icon = getIcon(config.icon);
  }
  if (Array.isArray(config.children)) {
    config.children = appendIcons(config.children);
  }
  return config;
}

export default appendIcons;
