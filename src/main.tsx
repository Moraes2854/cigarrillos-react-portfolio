import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { AppTheme } from './theme';
import { store } from './store'
import { CigarrillosApp } from './CigarrillosApp'
import { LoadingProvider } from './context/LoadingContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppTheme>
        <LoadingProvider>
          <CigarrillosApp />
        </LoadingProvider>
      </AppTheme>
    </Provider>
  </React.StrictMode>
)

window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);
