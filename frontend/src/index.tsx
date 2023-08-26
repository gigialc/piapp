import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import './defaults.css';
import { BrowserRouter, } from 'react-router-dom';// import ReactDOM from 'react-dom'; 
import './defaults.css';
import 'normalize.css';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);