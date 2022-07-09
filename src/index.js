import React from 'react';
import {createRoot}  from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from '../src/App/App';
import { Provider } from 'react-redux';
import { store } from './_helpers';
const root = createRoot(document.getElementById("root"))
root.render
  (
    <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
    </BrowserRouter>  
  );
