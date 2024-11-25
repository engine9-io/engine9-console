import React from 'react';
import Plugins from '@market/Plugins';
import PluginDetail from '@market/PluginDetail';
import { Routes, Route } from 'react-router';

export default function Market() {
  return (
    <div className="engine9-market">
      <Routes>
        <Route path="/plugins" element={<Plugins />} />
        <Route path="/plugins/:id" element={<PluginDetail />} />
        <Route path="/*" element={<Plugins />} />
      </Routes>
    </div>
  );
}
