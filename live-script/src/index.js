import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CurrentContextProvider } from './Contexts/CurrentContext';
import { WebSocketContextProvider } from './Contexts/WebSocketContext';
import { LocalStorageContextProvider } from './Contexts/LocalStorageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalStorageContextProvider>
    <CurrentContextProvider>
      <WebSocketContextProvider>
        <App />{' '}
      </WebSocketContextProvider>
    </CurrentContextProvider>
  </LocalStorageContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
