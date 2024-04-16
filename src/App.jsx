import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import AppLayout from '@crema/core/AppLayout';
import Engine9UI from '@engine9/ui';
import '@crema/mockapi';
import { GlobalStyles } from '@crema/core/theme/GlobalStyle';
import { Normalize } from 'styled-normalize';
import './styles/index.css';

function App() {
  return (
    <AppContextProvider>
      <AppThemeProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <AppAuthProvider>
              <AuthRoutes>
                <GlobalStyles />
                <Normalize />
                <Routes>
                  <Route path="/dynamic" element={<Engine9UI />} />
                  <Route path="/dynamic/*" element={<Engine9UI />} />
                  <Route path="*" element={<AppLayout />} />
                </Routes>
              </AuthRoutes>
            </AppAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
}

export default App;
