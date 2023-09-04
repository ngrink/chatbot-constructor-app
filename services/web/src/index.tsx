import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { Context, Store } from '@store/index';
import reportWebVitals from './reportWebVitals';
import '@assets/css/index.scss';
import '@assets/css/utils.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Context.Provider value={Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
