import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UrlProvider } from './UrlContext';

ReactDOM.render(
  <UrlProvider>
    <App />
  </UrlProvider>,
  document.getElementById('root')
);