import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import App from './app';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  MOUNT_NODE,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
