import React from 'react';
import { SnackbarProvider } from 'notistack'
import Transactions from './components/transactions';

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        variant='success'
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Transactions />
      </SnackbarProvider>
    </div>
  );
}

export default App;
