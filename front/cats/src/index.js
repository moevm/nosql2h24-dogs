import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";
//import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createSlice} from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice.js";
import userReducer from "./slice/userSlice.js";
import dataSlice from "./slice/dataSlice";



const store = configureStore({
    reducer: {
        filter: filterReducer,
        user: userReducer,
        data: dataSlice,
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
