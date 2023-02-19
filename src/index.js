import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { CustomTheme } from './theme/customTheme';
import {BrowserRouter }from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
              <Provider store={store}>
                  <App />
                </Provider>
      </BrowserRouter>
  </ThemeProvider>
);
