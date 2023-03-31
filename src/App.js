import React from 'react';
import AppRoutes from './AppRoutes';
import { ApiProvider } from './Providers/ApiProviders';

function App() {
  return (
    <ApiProvider>
      <AppRoutes />
    </ApiProvider>
  )
}

export default App;
