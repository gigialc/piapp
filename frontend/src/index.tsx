import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './defaults.css';
import Shop from './Shop';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Shop/>
  </BrowserRouter>,
  document.getElementById('root')
);