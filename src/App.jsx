import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import { GlobalStyles } from '@crema/core/theme/GlobalStyle';
import AuthRoutes from '@crema/components/AuthRoutes';
import Engine9UI from '@engine9/ui';
import { Normalize } from 'styled-normalize';
import AppSuspense from '@crema/components/AppSuspense';// Suspense and error boundary go hand in hand
import AppErrorBoundary from '@crema/components/AppErrorBoundary';

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
                <AppSuspense>
                  <AppErrorBoundary>
                    <Routes>
                      <Route path="*" element={<Engine9UI />} />
                    </Routes>
                  </AppErrorBoundary>
                </AppSuspense>
              </AuthRoutes>
            </AppAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
}

export default App;
